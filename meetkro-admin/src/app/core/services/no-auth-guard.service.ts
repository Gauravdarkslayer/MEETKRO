import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtService } from './jwt.service';


@Injectable()
export class NoAuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private jwtService: JwtService
    ) { }

    canActivate(): boolean {
        if (this.jwtService.getToken()) {
            this.router.navigate(['dashboard']);
            return false;
        } else {
            return true;
        }
    }
}
