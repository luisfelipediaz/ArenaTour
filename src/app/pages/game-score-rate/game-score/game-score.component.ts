import { Component, Input } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Score } from 'src/app/app.model';
import { Game } from 'src/app/entities/game';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent {
  @Input() game: Game;

  get score(): Score {
    return this.game.currentSet;
  }

  get setsTeam1(): number {
    return this.game.scores.filter(score => score.winner === 'team1').length;
  }

  get setsTeam2(): number {
    return this.game.scores.filter(score => score.winner === 'team2').length;
  }

  constructor(private fs: AngularFirestore) { }

  incrementTeamOne() {
    this.game.rate('team1');
    this.saveChanges();
  }

  decrementTeamOne() {
    this.game.unrate('team1');
    this.saveChanges();
  }

  incrementTeamTwo() {
    this.game.rate('team2');
    this.saveChanges();
  }

  decrementTeamTwo() {
    this.game.unrate('team2');
    this.saveChanges();
  }

  private async saveChanges() {
    await this.fs.doc(`games/${this.game.id}`).update(this.game.toJSON());
  }

  async inactiveGame() {
    this.game.inactive();
    await this.saveChanges();
    alert('Se ha ocultado el juego');
  }

  getTeam1Logo() {
    return `assets/logos/${this.game.team1.club}.jpg`;
  }

  getTeam2Logo() {
    return `assets/logos/${this.game.team2.club}.jpg`;
  }
}
