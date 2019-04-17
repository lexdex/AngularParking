import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../provider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Provider} from '../../../model/view/provider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProviderRequest} from '../add-provider/provider-request';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-update-provider',
    templateUrl: './update-provider.component.html',
    styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {

    provider: Provider;
    loadedProvider: Provider;
    providerRequest: ProviderRequest;
    providerForm: FormGroup;
    step = -1;

    nameControl: FormControl = new FormControl('', [
        Validators.required
    ]);
    cityControl: FormControl = new FormControl('', [
        Validators.required
    ]);
    streetControl: FormControl = new FormControl('', [
        Validators.required
    ]);
    buildingControl: FormControl = new FormControl('', [
        Validators.required, Validators.pattern('^\\d+[a-zA-Z]{0,1}$')
    ]);
    activeControl: FormControl = new FormControl('', [Validators.required]);

    constructor(private providerService: ProviderService,
                private snackBar: MatSnackBar,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.getProvider();
        this.providerForm = this.formBuilder.group({
            name: this.nameControl,
            city: this.cityControl,
            street: this.streetControl,
            building: this.buildingControl,
            active: this.activeControl
        });
    }

    getProvider() {
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.providerService.getDetail(id)
        .subscribe(provider => {
            this.loadedProvider = provider;
            this.provider = provider.clone();
        });
    }

    updateProvider(): void {
        this.providerRequest = this.providerForm.value;
        this.providerRequest.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.providerService.save(this.providerRequest).subscribe((response: HttpResponse<any>) => {
            this.snackBar.open('Provider updated sucsessfully.', null, {
                duration: 2000
            });
            this.router.navigate(['configuration/providers']);
        });
    }

    setStep(index: number): void {
        this.step = index;
    }

    nextStep(): void {
        this.step++;
    }

    prevStep(): void {
        this.step--;
    }

    resetAddress() {
        this.provider.city = this.loadedProvider.city;
        this.provider.street = this.loadedProvider.street;
        this.provider.building = this.loadedProvider.building;
    }

    resetCompanyName() {
        this.provider.name = this.loadedProvider.name;
    }

}
