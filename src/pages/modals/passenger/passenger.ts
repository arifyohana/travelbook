import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger',
  templateUrl: 'passenger.html',
})
export class PassengerPage {
  required: any;
  category: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.required = this.navParams.get('required');
    this.category = this.navParams.get('category');
  }

  ionViewDidLoad() {

  }

  isTextBox(item) {
    return (item.category === this.category && item.type === 'textbox');
  }
  isSelect(item) {
    return (item.category === this.category && item.type === 'combobox');
  }
  isDatetime(item) {
    return (item.category === this.category && item.type === 'datetime');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  simpan() {
    this.viewCtrl.dismiss(this.required);
  }
}
