import { Component } from '@angular/core';
import {
  NavController,
  MenuController,
  PopoverController
} from '@ionic/angular';

import { NotificationsComponent } from './../../components/notifications/notifications.component';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  themeCover = 'assets/img/clubes.jpg';

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController
  ) { }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
