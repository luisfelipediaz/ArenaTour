import { Component, OnInit } from '@angular/core';
import { ParamsService } from 'src/app/params.service';
import { GameData } from 'src/app/app.model';
import { Game } from 'src/app/entities/game';

@Component({
  selector: 'app-game-score-rate',
  templateUrl: './game-score-rate.page.html',
  styleUrls: ['./game-score-rate.page.scss']
})
export class GameScoreRatePage implements OnInit {
  game: Game;

  private gameJson: GameData;

  constructor(private navParams: ParamsService) { }

  ngOnInit() {    
    this.gameJson = this.navParams.get('game');
    this.game = new Game(this.gameJson.team1, this.gameJson.team2, this.gameJson.lengthen);
    this.game.ended = this.gameJson.ended;
    this.game.id = this.gameJson.id;
    this.game.scores = this.gameJson.scores;
    this.game.set = this.gameJson.set;
    this.game.winner = this.gameJson.winner;

  }

}
