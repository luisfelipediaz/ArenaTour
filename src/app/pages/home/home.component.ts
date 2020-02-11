import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/interfaces/pages';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { menusAnyUser, menusWithFlag } from 'src/app/menu';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public menus$: Observable<Pages[]>;

  get logged(): boolean {
    return !!this.afAuth.auth.currentUser;
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.menus$ = this.authService.role$.pipe(
      map((role) => ([...menusWithFlag.filter(menu => menu.flag & role), ...menusAnyUser])),
      startWith(menusAnyUser),
      map(menus => menus.sort((ant, act) => ant.order > act.order ? 1 : -1))
    );
  }

  openFacebook() {
    window.open('https://www.facebook.com/Arena-Tour-2171828469765160/', '_blank');
  }

  openInstagram() {
    window.open('https://www.instagram.com/arenatourcolombia/', '_blank');
  }

  openPage() {
    window.open('https://arenatourcolombia.com/', '_blank');
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  goToLogin() {
    this.navCtrl.navigateRoot('login');
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.navCtrl.navigateRoot('/');
  }
}
