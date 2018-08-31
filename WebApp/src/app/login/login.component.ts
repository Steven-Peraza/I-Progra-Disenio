import { Component, OnInit } from '@angular/core';
import { ProfilesServiceService } from '../services/profiles-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:ProfilesServiceService) { }

  ngOnInit() {
  }

  user:any = null

  signInWithFacebook(){
    this._authService.signInWithFacebook();
    
  }

  signInWithGoogle(){
    this._authService.signInWithGoogle();
  }

}
