import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { mergeMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Roles } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<{ [key: string]: any; }>;
  isAdminOrReferee$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  role$: Observable<Roles>;

  constructor(private fsAuth: AngularFireAuth, private fs: AngularFirestore) {
    this.extractUserData();
    this.destrocturingUserData();
  }

  private destrocturingUserData() {
    this.isAdmin$ = this.userData$.pipe(map(data => data.admin));
    this.isAdminOrReferee$ = this.userData$.pipe(map(data => data.admin || data.referee));
    this.role$ = this.userData$.pipe(map(data => Roles[data.role as string]));
  }

  private extractUserData() {
    this.userData$ = this.fsAuth.user.pipe(
      mergeMap(user => user ? user.getIdTokenResult() : of({ claims: {} })),
      map(user => user.claims)
    );
  }
}
