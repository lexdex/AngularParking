import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from "./login-data";
import {Router} from "@angular/router";
import {TokenPair} from "../token/token-pair";
import {TokenStorage} from "../token/token-storage";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomAuthService} from "../custom-auth.service";
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedinLoginProvider
} from 'angular5-social-auth';
import {SocialPrincipal} from "./social-principal";
import {MatSnackBar} from "@angular/material";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide: boolean = true;
    loginForm: FormGroup;
    loginData: LoginData;

    emailControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    passwordControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
    ]);

    constructor(private formBuilder: FormBuilder,
                private authService: CustomAuthService,
                private router: Router,
                private tokenStorage: TokenStorage,
                private socialAuthService: AuthService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: this.emailControl,
            password: this.passwordControl
        });
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "linkedin") {
            socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + " sign in data : ", userData);
                console.log(userData.email);
                this.authService.signInWithSocial(new SocialPrincipal(
                    userData.id,
                    userData.email,
                    userData.name,
                    userData.provider))
                    .subscribe((token: TokenPair) => {
                        this.tokenStorage.saveToken(token);
                        this.snackBar.open('You are successfully authorized', null, {
                            duration: 4000
                        });
                        this.router.navigate(['/']);
                    }, (error) => {
                        if (error instanceof HttpErrorResponse)
                            this.snackBar.open(error.error.response, null, {
                                duration: 5000
                            });
                    })
            }
        );
    }

    login = () => {
        this.loginData = this.loginForm.value;
        this.authService.signIn(this.loginData)
            .subscribe((token: TokenPair) => {
                    this.tokenStorage.saveToken(token);
                    this.snackBar.open('You are successfully authorized', null, {
                        duration: 4000
                    });
                    this.router.navigate(['/']);
                }, (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.error.description == "User is disabled") {
                            this.snackBar.open("Your account is not activated. Please confirm the registration", null, {
                                duration: 5000
                            });
                        } else {
                            this.snackBar.open(error.error.response, null, {
                                duration: 5000
                            });
                        }
                    }
                }
            );
    };
}


