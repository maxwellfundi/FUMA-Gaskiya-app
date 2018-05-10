import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
//import { ModifierTypeSolePage } from '../modifier-type-sole/modifier-type-sole';
import { PouchdbProvider } from '../../../providers/pouchdb-provider';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DetailTypeSole page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-detail-type-sole',
  templateUrl: 'detail-type-sole.html'
})
export class DetailTypeSolePage {

  typeSole: any = {};
  typeSoleID: any;

   constructor(public servicePouchdb: PouchdbProvider, public toastCtl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtl: AlertController) {
    this.typeSole = this.navParams.data.typeSole;
    this.typeSoleID = this.typeSole._id;
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad DetailUnionPage');
    this.servicePouchdb.getDocById(this.typeSoleID).then((ts) => {
      this.typeSole = ts;
    }, err => console.log(err))
  }

  editer(typeSole){
    this.navCtrl.push('ModifierTypeSolePage', {'typeSole': typeSole});
  }

  supprimer(typeSole){
    let alert = this.alertCtl.create({
      title: 'Suppression type sole',
      message: 'Etes vous sûr de vouloir supprimer cet type de sole ?',
      inputs: [
        {
          type: 'checkbox',
          label: 'Supprimer définitivement!',
          value: 'oui',
          checked: false
          }
      ],
      buttons:[
        {
          text: 'Non',
          handler: () => console.log('suppression annulée')
 
        },
        {
          text: 'Oui',
          handler: (data) => {
            if(data.toString() === 'oui'){
              this.servicePouchdb.deleteDoc(typeSole);
              let toast = this.toastCtl.create({
                message:'Type sole bien supprié',
                position: 'top',
                duration: 3000
              });

              toast.present();
              this.navCtrl.pop();
            }else{
              this.servicePouchdb.deleteDoc(typeSole);
              let toast = this.toastCtl.create({
                message:'Type sole bien supprié',
                position: 'top',
                duration: 3000
              });

              toast.present();
              this.navCtrl.pop();
            }
            
          }
        }
      ]
    });

    alert.present();
  }

 
}
