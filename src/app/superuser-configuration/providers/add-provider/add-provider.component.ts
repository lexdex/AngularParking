import {Component, OnInit} from '@angular/core';
import {ProviderService} from '../provider.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProviderRequest} from './provider-request';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-provider',
    templateUrl: './add-provider.component.html',
    styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

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

    constructor(private providerService: ProviderService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private router: Router) {
    }

    ngOnInit() {
        this.providerForm = this.formBuilder.group({
            name: this.nameControl,
            city: this.cityControl,
            street: this.streetControl,
            building: this.buildingControl
        });
    }

    saveProvider(): void {
        this.providerRequest = this.providerForm.value;
        this.providerService.save(this.providerRequest).subscribe((response: HttpResponse<any>) => {
            this.snackBar.open('Provider added sucsessfully.', null, {
                duration: 2000
            });
            this.router.navigate(['configuration/providers']);
        }, error => {
            this.snackBar.open('Provider  with the such name is already exists in database .'
                , null, {
                    duration: 2000
                });
        });
    };
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
        this.cityControl.reset();
        this.streetControl.reset();
        this.buildingControl.reset();
    }

    resetCompanyName(){
        this.nameControl.reset();
    }
}


