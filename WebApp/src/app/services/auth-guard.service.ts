import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ProfilesServiceService} from './profiles-service.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: ProfilesServiceService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.getUser == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}