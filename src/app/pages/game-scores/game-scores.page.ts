import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { GameData, Roles } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ParamsService } from 'src/app/params.service';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-scores',
  templateUrl: './game-scores.page.html',
  styleUrls: ['./game-scores.page.scss'],
})
export class GameScoresPage implements OnInit {
  games$: Observable<GameData[]>;
  canNewGame$: Observable<boolean>;

  constructor(
    private fs: AngularFirestore,
    private navParams: ParamsService,
    private navController: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.games$ = this.fs.collection<GameData>(`games`).valueChanges();

    this.canNewGame$ = this.authService.role$.pipe(map(role => [Roles.referee, Roles.referee].includes(role)));
  }

  goToGame(game: GameData) {
    this.navParams.push('game', game);
    this.navController.navigateForward('game-score-rate');
  }

  goToNewGame() {
    this.navController.navigateForward('create-game');
  }
}
