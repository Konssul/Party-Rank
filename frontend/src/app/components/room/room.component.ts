import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LocationStrategy } from '@angular/common';

/*Necesita un poco de refactorización!!!*/

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'

})
export class RoomComponent {


  private nextVideoIndexSubscription: Subscription | undefined;

  roomName = '';
  isAdmin = false;
  i = 0;
  youtubeUrls: SafeResourceUrl[] = [
    "https://youtu.be/ow7iv7cXpTo?si=N5qGlhrzsFR_bYLM",
    "https://youtu.be/WBhgmyPYSbQ?si=J16FhFPJ0he7Tl9J",
    "https://youtu.be/qaTfRV5XwNc?si=Bw7moYmmOTL5Gn1c",
    "https://youtu.be/-tKVN2mAKRI?si=268bVPsca2YVz6Oh",
    "https://youtu.be/ZNUm-ZWrMnk?si=upk9RIR35U-SyRy2"
  ]
  currentVideoUrl: SafeResourceUrl | undefined;


  constructor(private roomService: RoomService, private router: Router, private sanitizer: DomSanitizer, private location: LocationStrategy) {
    console.log("Constructor" + this.i)
    this.i = 0;
    const navigation = this.router.getCurrentNavigation();
    if (navigation != null) {
      console.log(navigation.extras.state);
      const state = navigation.extras.state as { roomName: string, isAdmin: boolean };
      this.roomName = state.roomName;
      this.isAdmin = state.isAdmin;
    }

    this.youtubeUrls = this.youtubeUrls.map(url => this.extractVideoCode(url));

    this.nextVideoIndexSubscription = this.roomService.nextVideoIndex$.subscribe((index) => {
      this.i = index;
      if( this.i>0 && this.i<2){
      history.back(); //No sé como funciona ni como lo he descubierto, pero funciona SDKJAHD 
      }
    });

 
  
    
    history.pushState(null, '', window.location.href);  
    this.location.onPopState(() => {
      console.log();
      history.pushState(null, '', window.location.href);
    }); 
    
   
  
  }

  


  nextVideo(): void {
    if (this.i < this.youtubeUrls.length - 1)
      this.i = this.i + 1;
  }

  extractVideoCode(url: SafeResourceUrl): SafeResourceUrl {
    console.log("EXTRACT");
    const urlString = url.toString();
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([^"&?\/\s]{11})/;
    const match = urlString.match(regex);
    const videoCode = match ? match[1] : '';

    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoCode}?autoplay=1&color=white&fs=0&showinfo=0&rel=0`);

    return safeUrl;
  }

  getVideoUrl(url: string): SafeResourceUrl {
    this.currentVideoUrl = this.extractVideoCode(url);
    return this.currentVideoUrl;
  }



  getIndex(){
    return this.i;
  }

  nexVideoToService() {
    

    this.nextVideo();
    this.roomService.nextVideoService(this.roomName, this.i);
  }
  ngOnDestroy(): void {
    if (this.nextVideoIndexSubscription) {
      this.nextVideoIndexSubscription.unsubscribe();
    }
  }

}
