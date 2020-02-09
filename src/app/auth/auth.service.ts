import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { filter, mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { firestore } from 'firebase/app';
import { Roles } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<{ role: Roles, data: firestore.DocumentReference }>;
  role$: Observable<Roles>;
  document$: Observable<AngularFirestoreDocument>;

  constructor(private fsAuth: AngularFireAuth, private fs: AngularFirestore) {
    this.extractUserData();
    this.destrocturingUserData();
  }

  private destrocturingUserData() {
    this.role$ = this.userData$.pipe(map(data => data.role));
    this.document$ = this.userData$.pipe(map(data => this.fs.doc(data.data)));
  }

  private extractUserData() {
    this.userData$ = this.fsAuth.user.pipe(
      filter(user => !!user),
      mergeMap(user => this.fs.doc<{ role: Roles; data: firestore.DocumentReference; }>(`/users/${user.uid}`).valueChanges())
    );
  }
}
