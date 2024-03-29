import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { GameData } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ParamsService } from 'src/app/params.service';
import { AuthService } from 'src/app/auth/auth.service';

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
    this.games$ = this.fs.collection<GameData>(`games`, (query) => query.where('active', '==', true)).valueChanges();

    this.canNewGame$ = this.authService.isAdminOrReferee$;
  }

  goToGame(game: GameData) {
    this.navParams.push('game', game);
    this.navController.navigateForward('game-score-rate');
  }

  goToNewGame() {
    this.navController.navigateForward('create-game');
  }
}
