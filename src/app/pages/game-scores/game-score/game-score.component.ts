import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GameData, Score } from 'src/app/app.model';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {
  @Input() game: GameData;
  @Input() isAdminOrReferee: boolean;
  @Output() goToGame = new EventEmitter<void>();

  get score(): Score {
    return this.game.scores[this.game.set - 1];
  }

  get setsTeam1(): number {
    return this.game.scores.filter(score => score.winner === 'team1').length;
  }

  get setsTeam2(): number {
    return this.game.scores.filter(score => score.winner === 'team2').length;
  }

  emitGoToGame() {
    if (!this.isAdminOrReferee) { return; }

    this.goToGame.emit();
  }

  getTeam1Logo() {
    return `assets/logos/${this.game.team1.club}.jpg`;
  }

  getTeam2Logo() {
    return `assets/logos/${this.game.team2.club}.jpg`;
  }

}
