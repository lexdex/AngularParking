import {Component, OnInit} from '@angular/core';
import {ClientService} from "../client.service";
import {Client} from "../../model/view/client";
import {Router, ActivatedRoute} from '@angular/router';
import {Parking} from "../../model/view/parking";

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

    client: Client;
    favoritesParkings: Parking[] = [];

    constructor(private route: ActivatedRoute,
                private clientService: ClientService,
                private router: Router) {
    }

    ngOnInit() {
        this.getClientById();
        this.getClientsFavoriteParkings();
    }

    getClientById(): void {
        const id = +parseInt(this.route.snapshot.paramMap.get('id'));
        this.clientService.getClientDetail(id)
            .subscribe(client => this.client = client);
    }

    getClientsFavoriteParkings(): void {
        const id = +parseInt(this.route.snapshot.paramMap.get('id'));
        this.clientService.getClientsFavoritesParkingsById(id)
            .subscribe(favoritesParkings => this.favoritesParkings = favoritesParkings);
    }

    goToClientsList() {
        this.router.navigate(['configuration/clients']);
    }

    goToClientEditForm() {
        this.router.navigate(['configuration/clients/edit/', this.client.id]);
    }

}
