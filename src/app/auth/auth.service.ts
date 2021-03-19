import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { mergeMap, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Roles } from '../app.model';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<firebase.default.User>
  userDataClaims$: Observable<{ [key: string]: any; }>;
  isAdminOrReferee$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  role$: Observable<Roles>;

  constructor(private fsAuth: AngularFireAuth, private fs: AngularFirestore) {
    this.extractUserData();
    this.destrocturingUserData();
  }

  async logout() {
    await this.fsAuth.signOut();
  }

  private destrocturingUserData() {
    this.isAdmin$ = this.userDataClaims$.pipe(map(data => data.admin));
    this.isAdminOrReferee$ = this.userDataClaims$.pipe(map(data => data.admin || data.referee));
    this.role$ = this.userDataClaims$.pipe(map(data => Roles[data.role as string]));
  }

  private extractUserData() {
    this.userData$ = this.fsAuth.user.pipe(distinctUntilChanged((actual, anterior) => isEqual(actual, anterior)));
    this.userDataClaims$ = this.userData$.pipe(
      mergeMap(user => user ? user.getIdTokenResult() : of({ claims: {} })),
      map(user => user.claims)
    );
  }
}
