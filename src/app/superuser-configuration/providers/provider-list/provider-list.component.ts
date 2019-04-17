import {Component, OnInit} from '@angular/core';
import {Provider} from '../../../model/view/provider';
import {ProviderService} from '../provider.service';
import {ProviderListFilterParameters} from '../../../model/filter/provider-list-filter-parameters';
import {FormControl, FormGroup,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-provider-list',
    templateUrl: './provider-list.component.html',
    styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
    providers: Provider[];
    active = new FormControl('');
    providerFilterForm = new FormGroup({
        active: this.active,
        companyName: new FormControl('', [])
    });

    providerFilter: ProviderListFilterParameters;

    constructor(private providerService: ProviderService,
                private router: ActivatedRoute,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getProviders();
    }

    getProviders(): void {
        if (this.router.queryParams) {
            this.router.queryParams
                .subscribe(params => {
                    this.providerFilter = new ProviderListFilterParameters();
                    this.providerFilter.active = params['active'];
                    this.providerFilter.companyName = params['companyName'];
                });
        }
        this.providerService.getAllByFilter(this.providerFilter)
            .subscribe(providers => {
                this.providers = providers;
                this.snackBar.open(providers.length + ' matches was found.', null, {
                    duration: 2000
                });
            });
    }

}
