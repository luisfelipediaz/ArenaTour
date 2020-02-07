import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  @Input() team: Team;

  teams$: Observable<Team[]>;

  constructor(
    private fs: AngularFirestore,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.teams$ = this.fs.collection<Team>('/teams').valueChanges();
  }

  dismiss() {
    this.modalController.dismiss({ team: this.team });
  }

  emitChangeSelected(newTeam: Team) {
    this.modalController.dismiss({ team: newTeam });
  }

}
