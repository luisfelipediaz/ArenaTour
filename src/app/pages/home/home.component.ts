import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/interfaces/pages';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { menusAnyUser, menusWithFlag } from 'src/app/menu';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public menus$: Observable<Pages[]>;

  get user$() {
    return this.authService.userData$;
  }

  constructor(
    public navCtrl: NavController,
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
    await this.authService.logout();
    this.navCtrl.navigateRoot('home-results');
  }
}
