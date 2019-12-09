import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/interfaces/pages';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appPages: Array<Pages>;

  get logged(): boolean {
    return !!this.afAuth.auth.currentUser;
  }

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Marcadores',
        url: '/game-scores',
        direct: 'root',
        icon: 'baseball'
      },
      {
        title: 'Nosotros',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      {
        title: 'Por Definir',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },
      {
        title: 'Tienda',
        url: '/tienda',
        direct: 'forward',
        icon: 'card'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];
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

  logout() {
    this.navCtrl.navigateRoot('login');
  }
}
