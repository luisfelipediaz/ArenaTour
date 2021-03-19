import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.page.html',
  styleUrls: ['./profile-users.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProfileUsersPage implements OnInit {
  getUsers$: (data: void) => Observable<{ users: (firebase.default.UserInfo & { customClaims: any })[] }>;
  setUserClaim$: (data: { uid: string; role: string; }) => Observable<void>;

  users$: Observable<firebase.default.UserInfo[]>;

  constructor(
    private aff: AngularFireFunctions
  ) {
    this.getUsers$ = this.aff.httpsCallable<void, { users: (firebase.default.UserInfo & { customClaims: any })[] }>('getUsers');
    this.setUserClaim$ = this.aff.httpsCallable<{ uid: string, role: string }, void>('setUserClaim');
  }

  ngOnInit() {
    this.users$ = this.getUsers$().pipe(map(data => data.users));
  }

  async changeRoleUser(newRole: { detail: { value: string } }, user: firebase.default.UserInfo) {
    await this.setUserClaim$({ uid: user.uid, role: newRole.detail.value }).toPromise();
    alert('Usuario actualizado con éxito');
  }

}
