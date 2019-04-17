import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {TokenStorage} from "../token/token-storage";
import {Role} from "../roles";

@Injectable()
export class DriverGuard {

    constructor(private tokenStorage: TokenStorage,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkRights();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }

    checkRights(): boolean {
        if (this.tokenStorage.getRole() === Role.Driver || this.tokenStorage.getRole() === Role.Manager || this.tokenStorage.getRole() === Role.Admin) {
            return true;
        } else {
            this.router.navigate(['/error/forbidden']);
            return false;
        }
    }

}
