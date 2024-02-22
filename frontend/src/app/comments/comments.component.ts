import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  template: `
    
    <h3>Comentario de {{this.username}}</h3>
    <img src="https://formadoresit.es/wp-content/uploads/2021/02/angular-logo-png.png" />
    <p>PS C:\PartyRank\PartyRanking> cd frontend
  PS C:\PartyRank\PartyRanking\frontend> ng generate component comments --inline-template --inline-style
  CREATE src/app/comments/comments.component.spec.ts (633 bytes)
  CREATE src/app/comments/comments.component.ts (246 bytes)
  PS C:\PartyRank\PartyRanking\frontend> </p>

  `,
  styles: `
  img{
    width:500px;
    height:auto;
  }
  `
})
export class CommentsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  username = '';

  constructor(){
    this.username = this.route.snapshot.params['username'];

  }
}
