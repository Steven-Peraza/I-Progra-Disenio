import { Component } from '@angular/core';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Profile } from '../interface/profile.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public usuario: any = {};
  public itemsCollection: AngularFirestoreCollection<Profile>;
  public acm1pt: Observable<Profile[]>;

  constructor( private _authService: ProfilesServiceService, private afs: AngularFirestore ) {
    this._authService._firebaseAuth.authState.subscribe(user => {

      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.email = user.email;
      this.usuario.foto = user.photoURL;
      this.itemsCollection = this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', this.usuario.uid));
      this.acm1pt = this.itemsCollection.valueChanges();
    });


  }
}
