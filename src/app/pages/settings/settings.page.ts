import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  languages: any = ['English', 'Portuguese', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'BRL', 'EUR'];

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.navCtrl.navigateRoot('/');
  }

}
