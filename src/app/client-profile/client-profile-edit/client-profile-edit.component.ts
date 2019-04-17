import {Component, OnInit} from '@angular/core';
import {Role} from "../../clients/role";
import {Provider} from "../../model/view/provider";
import {Client} from "../../model/view/client";
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from "../../clients/client.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-client-profile-edit',
    templateUrl: './client-profile-edit.component.html',
    styleUrls: ['./client-profile-edit.component.css']
})
export class ClientProfileEditComponent implements OnInit {

    id: number;
    client: Client;
    loadedClient: Client;
    provider: Provider;
    providers: Provider[];
    roles: Role[];
    selectedRole: string;
    selectedProvidersId: number;
    step = -1;
    profileEditForm = new FormGroup({
        image: new FormControl('', []),
        firstName: new FormControl('', [Validators.required,]),
        lastName: new FormControl('', [Validators.required,])

    });


    constructor(private route: ActivatedRoute,
                private clientService: ClientService,
                private router: Router,
                private snackBar: MatSnackBar) {
    }


    ngOnInit() {
        this.getClientProfile();
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

    resetFirstName() {
        this.client.firstName = this.loadedClient.firstName;
    }

    resetLastName() {
        this.client.lastName = this.loadedClient.lastName;
    }

    resetImage() {
        this.client.image = this.loadedClient.image;
    }

    getClientProfile(): void {
        this.clientService.getClientProfile()
            .subscribe(client => {
                this.client = client;
                this.loadedClient = Client.copyOf(client);
            });
    }


    udateProfile(): void {
        this.clientService.updateClientProfile(parseInt(this.client.id), this.client)
            .subscribe(data => {
                this.snackBar.open('Client profile was updated successfully.', null, {
                    duration: 2000
                });
            });

    }

    goToProfile() {
        this.router.navigate(['profile']);
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.client.image = reader.result.split(',')[1];
            };
        }
    }



    goToPasswordEdit() {
        this.router.navigate(['profile/edit/password']);
    }

}
