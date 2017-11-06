import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  required: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.required = this.navParams.get('required');
  }

  ionViewDidLoad() {

  }

  isTextBox(item) {
    return (item.category === 'contact' && item.type === 'textbox');
  }
  isSelect(item) {
    return (item.category === 'contact' && item.type === 'combobox');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  simpan() {
    this.viewCtrl.dismiss(this.required);
  }
}
