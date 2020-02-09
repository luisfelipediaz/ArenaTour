import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { filter, mergeMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<{ [key: string]: any; }>;
  isAdminOrReferee$: Observable<boolean>;

  constructor(private fsAuth: AngularFireAuth, private fs: AngularFirestore) {
    this.extractUserData();
    this.destrocturingUserData();
  }

  private destrocturingUserData() {
    this.isAdminOrReferee$ = this.userData$.pipe(map(data => data.admin || data.referee));
  }

  private extractUserData() {
    this.userData$ = this.fsAuth.user.pipe(
      mergeMap(user => user ? user.getIdTokenResult() : of({ claims: {} })),
      map(user => user.claims)
    );
  }
}
