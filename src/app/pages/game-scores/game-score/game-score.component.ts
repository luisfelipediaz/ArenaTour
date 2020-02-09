import { Component, OnInit, Input } from '@angular/core';
import { GameData, Score } from 'src/app/app.model';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit {
  @Input() game: GameData;

  get score(): Score {
    return this.game.scores[this.game.set - 1];
  }

  get setsTeam1(): number {
    return this.game.scores.filter(score => score.winner === 'team1').length;
  }

  get setsTeam2(): number {
    return this.game.scores.filter(score => score.winner === 'team2').length;
  }

  constructor() { }

  ngOnInit() {
  }

}
