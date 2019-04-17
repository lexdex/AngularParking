import {Component, OnInit} from '@angular/core';
import {ProviderService} from './providers/provider.service';
import {Role} from "../auth/roles";
import {TokenStorage} from "../auth/token/token-storage";

@Component({
    selector: 'app-superuser-configuration',
    templateUrl: './superuser-configuration.component.html',
    styleUrls: ['./superuser-configuration.component.css']
})
export class SuperuserConfigurationComponent implements OnInit {
    role: any = Role;

    constructor(private providerService: ProviderService,
                private tokenStorage: TokenStorage) {
    }

    ngOnInit() {
    }

    getRole(): Role {
        return this.tokenStorage.getRole();
    }


}
