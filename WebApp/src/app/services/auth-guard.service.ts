import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilesServiceService} from './profiles-service.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: ProfilesServiceService, public router: Router) {}
  
  canActivate(): boolean {
  this.auth.getUser()
    .subscribe(
      (user)=>{
        if(user == null){
          this.router.navigate(['login'])
          return false;
        }
        else{
          return true;
        }
      }
    )
    return true;
  }
}