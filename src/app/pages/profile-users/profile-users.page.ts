import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.page.html',
  styleUrls: ['./profile-users.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProfileUsersPage implements OnInit {
  getUsers$: (data: void) => Observable<any>;

  constructor(
    private aff: AngularFireFunctions
  ) {
    this.getUsers$ = this.aff.httpsCallable('getUsers');
  }

  ngOnInit() {
    this.getUsers$().subscribe(a => console.log(a));
  }

}
