import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordData} from '../../client-profile/client-profile-edit-password/password-data';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {ClientService} from '../../clients/client.service';
import {InfoResponse} from '../info-response';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({MatchPassword: true})
        } else {
            return null;
        }
    }
}

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
    isSent: boolean = false;
    hide: boolean = true;
    forgetPasswordForm: FormGroup;
    forgetPasswordData: PasswordData;

    emailControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.email,
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
                private clientService: ClientService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.forgetPasswordForm = this.formBuilder.group({
            email: this.emailControl,
            password: this.passwordControl,
            confirmPassword: this.confirmPasswordControl
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }

    sendConfirmation = () => {
        this.forgetPasswordData = this.forgetPasswordForm.value;
        this.clientService.sendForgetPasswordConfirmation(this.forgetPasswordData).subscribe((response: InfoResponse) => {
            this.snackBar.open('Check your email and confirm new password.', null, {
                duration: 5000
            });
            this.isSent = true;
        }, error => {
            this.snackBar.open('Email sending Error!', null, {
                duration: 5000
            });
        });
    }


}
