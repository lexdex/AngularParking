import {Component, OnInit} from '@angular/core';
import {ClientService} from "../client.service";
import {Client} from "../../model/view/client";
import {ActivatedRoute} from "@angular/router";
import {PagerService} from "../../_services/pager.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

    clients: Client[];

    // pager object
    pager: any = {};

    // paged items
    pagedClientItems: Client[];

    allClients: number;

    constructor(private clientService: ClientService,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private pagerService: PagerService) {
    }

    ngOnInit() {
        this.findLimitNumberOfClients();
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        if (this.clients.length > 0) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.clients.length, page);

            // get current page of items
            this.pagedClientItems = this.clients.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
        else {
            this.pagedClientItems = this.clients;
        }
        this.allClients = this.clients.length;
    }

    findAllClients(): void {
        this.clientService.getAllClients()
            .subscribe(clients => {
                this.clients = clients;
                this.messageSearchResults(this.clients.length, 'client');
                this.setPage(1);
            });
    }

    findLimitNumberOfClients(): void {
        this.clientService.getLimitNumberOfClients()
            .subscribe(clients => {
                this.clients = clients;
                this.setPage(1);
            });
    }

    findClientsFromBackEnd(searchInput: string): void {
        if (this.inputInSearchFieldIsNull(searchInput)) {
            this.findLimitNumberOfClients();
        } else {
            this.clientService.getClientsByAnyMatch(searchInput)
                .subscribe(clients => {
                    this.clients = clients;
                    this.messageSearchResults(this.clients.length, 'clients');
                    this.setPage(1);
                });
        }
    }

    inputInSearchFieldIsNull(searchInput: string): boolean {
        return searchInput == "";
    }

    findDrivers(): void {
        this.clientService.getClientsByRole("0")
            .subscribe(clients => {
                this.clients = clients;
                this.messageSearchResults(this.clients.length, 'drivers');
                this.setPage(1);
            });
    }

    findProviderManagers(): void {
        this.clientService.getClientsByRole("1")
            .subscribe(clients => {
                this.clients = clients;
                this.messageSearchResults(this.clients.length, 'provider managers');
                this.setPage(1);
            });
    }

    findSuperusers(): void {
        this.clientService.getClientsByRole("2")
            .subscribe(clients => {
                this.clients = clients;
                this.messageSearchResults(this.clients.length, 'superusers');
                this.setPage(1);
            });
    }

    messageSearchResults(numberOfClients: number, role: string) {
        if (numberOfClients < 1) {
            this.snackBar.open('No ' + role + ' were found', null, {
                duration: 3000
            });
        } else {
            this.snackBar.open('Was found ' + numberOfClients + ' ' + role, null, {
                duration: 3000
            });
        }
    }


}
