import {Component, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationData} from "./registration-data";
import {Router} from "@angular/router";
import {InfoResponse} from "../info-response";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomAuthService} from "../custom-auth.service";
import {MatSnackBar} from '@angular/material';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({MatchPassword: true})
        } else {
            return null
        }
    }
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    isSent: boolean = false;
    hide: boolean = true;
    registrationForm: FormGroup;
    registrationData: RegistrationData;

    emailControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    firstnameControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
    ]);
    lastnameControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
    ]);
    passwordControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
    ]);
    confirmPasswordControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
    ]);

    constructor(private formBuilder: FormBuilder,
                private authService: CustomAuthService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            email: this.emailControl,
            firstname: this.firstnameControl,
            lastname: this.lastnameControl,
            password: this.passwordControl,
            confirmPassword: this.confirmPasswordControl
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    register = () => {
        this.registrationData = this.registrationForm.value;
        this.authService.register(this.registrationData).subscribe((info: InfoResponse) => {
            this.snackBar.open(info.response, null, {
                duration: 4000
            });
            this.isSent = true;
        }, (error) => {
            if (error instanceof HttpErrorResponse) {
                this.snackBar.open(error.error.response, null, {
                    duration: 5000
                });
            }
        });
    }
}
