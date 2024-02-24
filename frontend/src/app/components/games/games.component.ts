import { Component, Input , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

  @Input() username = '';

  @Output() addFavoriteEvent = new EventEmitter<string>();

  fav(gameName: string){
    this.addFavoriteEvent.emit(gameName);
  }
  games = [
    {
      id:1,
      name:'The Witcher',
    },
    {
      id:2,
      name:'Zelda',
    },
    {
      id:3,
      name:'Papers, Please',
    }
]
}
