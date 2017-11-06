
import { AlertController } from 'ionic-angular';

export class IsiDataPageValidator {
  constructor(public alertCtrl: AlertController) {

  }

  presentAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Peringatan',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
