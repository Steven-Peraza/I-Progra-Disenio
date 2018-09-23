import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

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

  get currentUserObservable(): any {
    return this._firebaseAuth.auth;
  }

  getAuthState(): boolean {
    return this._firebaseAuth.authState !== null;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  salir() {
    return this._firebaseAuth.auth.signOut();
  }

}
