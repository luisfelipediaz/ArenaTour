import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teams } from 'src/app/app.model';
import { ModalController, NavController } from '@ionic/angular';
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { Game } from 'src/app/entities/game';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {
  newGame: FormGroup;

  constructor(
    private fs: AngularFirestore,
    private fb: FormBuilder,
    private modalController: ModalController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.newGame = this.fb.group({
      team1: [null, Validators.required],
      team2: [null, Validators.required],
      lengthen: false
    });
  }

  async openSelector(team: Teams) {
    const modal = await this.modalController.create({
      component: TeamSelectorComponent,
      componentProps: {
        team: this.newGame.value[team]
      }
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    const newValue = {};
    newValue[team] = data.team;
    this.newGame.patchValue(newValue);
  }

  saveNewGame() {
    const { team1, team2, lengthen } = this.newGame.value;
    const game = new Game(team1, team2, lengthen);

    game.id = this.fs.createId();
    this.fs.doc(`/games/${game.id}`).set(game.toJSON())
      .then(() => this.navCtrl.navigateRoot('/game-scores'));
  }

}
