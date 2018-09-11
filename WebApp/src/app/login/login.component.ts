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
    this._authService.getUser()
    .subscribe(
      data=>{
        console.log(data)
      }
    )
  }

  user:any = null

  signInWithFacebook(){
    this.user = this._authService.signInWithFacebook()
    .then(
      data=>{
        this.user = data
        console.log(this.user)
      }
    );
  }

  signInWithGoogle(){
    this._authService.signInWithGoogle()
    .then(
      data=>{
        this.user = data.user.displayName
        console.log(this._authService.getUser())
      }
    );
    
  }

}
