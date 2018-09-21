import { Component, OnInit } from '@angular/core';
import { ProfilesServiceService } from '../services/profiles-service.service';
import { Profile } from '../interface/profile.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public itemsCollection: AngularFirestoreCollection<Profile>;

  constructor(private _authService: ProfilesServiceService, private afs: AngularFirestore) {
  }

  ngOnInit() {
    this._authService.getUser()
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }

  user:any = null;

  signInWithFacebook() {
    this.user = this._authService.signInWithFacebook()
    .then(
      data => {
        this.user = data;
        console.log(this.user);
      }
    );
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle()
    .then(
      data => {
        this.user = data.user.displayName;
        console.log(this._authService.getUser());
        this.createNewProfile(data.user.uid);
      }
    );

  }

  createNewProfile(uid2: string) {
    this._authService._firebaseAuth.authState.subscribe(user => {

      if (!user) {
        return;
      }
      uid2 = user.uid;

    });
    console.log(uid2);

    this.itemsCollection = this.afs.collection<Profile>('profiles');

    this.afs.collection<Profile>('profiles', ref => ref.where('uid', '==', uid2))
    .snapshotChanges().subscribe(res => {
      if (res.length > 0 ) {
      console.log('El perfil ya existe');
      } else {
      this.itemsCollection.add({ empatados: 0, ganados: 0, perdidos: 0, nivel: 'Rook', uid: uid2 });
      }
  });

  }

}
