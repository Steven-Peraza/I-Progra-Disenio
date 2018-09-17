import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ProfilesServiceService {

  private static user: firebase.auth.UserCredential;

  constructor(
    public _firebaseAuth: AngularFireAuth
  ) { }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }
  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  getUser() {
    return this._firebaseAuth.user;
  }

doRegister(value) {
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(res => {
      resolve(res);
    }, err => reject(err));
  });
}

}
