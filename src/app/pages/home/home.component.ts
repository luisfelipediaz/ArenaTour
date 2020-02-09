import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/interfaces/pages';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { map, filter } from 'rxjs/operators';
import { Roles } from 'src/app/app.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appPages: Array<Pages>;
  public atitionalPages$: Observable<Pages[]>;

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
    this.appPages = [
      { title: 'Home', url: '/home-results', direct: 'root', icon: 'home' },
      { title: 'Marcadores', url: '/game-scores', direct: 'root', icon: 'baseball' },
      { title: 'Nosotros', url: '/about', direct: 'forward', icon: 'information-circle-outline' },
      { title: 'Historia', url: '/about', direct: 'forward', icon: 'information-circle-outline' },
      { title: 'Tienda', url: '/tienda', direct: 'forward', icon: 'card' },
      { title: 'App Settings', url: '/settings', direct: 'forward', icon: 'cog' }
    ];

    this.atitionalPages$ = this.authService.role$.pipe(
      filter(role => [Roles.referee, Roles.referee].includes(role)),
      map(() => ([{ title: 'Nuevo partido', url: '/create-game', direct: 'root', icon: 'add-circle-outline' }]))
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

  logout() {
    this.afAuth.auth.signOut();
  }
}
