import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../app.model';

@Component({
  selector: 'app-game-scores',
  templateUrl: './game-scores.page.html',
  styleUrls: ['./game-scores.page.scss'],
})
export class GameScoresPage implements OnInit {
  increment = firebase.firestore.FieldValue.increment(1);
  decrement = firebase.firestore.FieldValue.increment(-1);
  document: AngularFirestoreDocument<{ team1: firebase.firestore.FieldValue, team2: firebase.firestore.FieldValue }>;
  team1$: Observable<firebase.firestore.FieldValue>;
  team2$: Observable<firebase.firestore.FieldValue>;

  game: Game = {
    finish: false,
    scores: [{ team1: 12, team2: 20, winner: null }],
    set: 1,
    team1: { id: '1', name: 'BOG.' },
    team2: { id: '1', name: 'ANT.' },
    winner: null
  };

  constructor(
    private fs: AngularFirestore
  ) { }

  ngOnInit() {
    this.document = this.fs.doc<{ team1: firebase.firestore.FieldValue, team2: firebase.firestore.FieldValue }>(`games/bog-ant`);
    const valueChanges = this.document.valueChanges().pipe(map(game => game));
    this.team1$ = valueChanges.pipe(map(game => (game).team1));
    this.team2$ = valueChanges.pipe(map(game => game.team2));
  }

  incrementTeamOne() {
    this.document.update({ team1: this.increment });
  }

  incrementTeamTwo() {
    this.document.update({ team2: this.increment });
  }


  decrementTeamOne() {
    this.document.update({ team1: this.decrement });
  }

  decrementTeamTwo() {
    this.document.update({ team2: this.decrement });
  }

}
