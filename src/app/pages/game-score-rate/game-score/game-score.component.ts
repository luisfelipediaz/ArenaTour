import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Score } from 'src/app/app.model';
import { Game } from 'src/app/entities/game';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit {
  @Input() game: Game;

  get score(): Score {
    return this.game.scores[this.game.set - 1];
  }

  get setsTeam1(): number {
    return this.game.scores.filter(score => score.winner === 'team1').length;
  }

  get setsTeam2(): number {
    return this.game.scores.filter(score => score.winner === 'team2').length;
  }

  constructor(
    private fs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  incrementTeamOne() {
    this.game.rate('team1');
    this.fs.doc(`games/${this.game.id}`).update(this.game.toJSON());
  }

  decrementTeamOne() {

  }

  incrementTeamTwo() {
    this.game.rate('team2');
    this.fs.doc(`games/${this.game.id}`).update(this.game.toJSON());
  }

  decrementTeamTwo() {

  }

}
