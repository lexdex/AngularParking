import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { InfoResponse } from '../../info-response';
import { ClientService } from '../../../clients/client.service';

@Component({
  selector: 'app-registaration-confirmation',
  templateUrl: './registaration-confirmation.component.html',
  styleUrls: ['./registaration-confirmation.component.css']
})
export class RegistarationConfirmationComponent implements OnInit {

  isChanging: boolean = false;
  isError: boolean= false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    const pathUUID = this.route.snapshot.paramMap.get('uuid');
      this.clientService.activateUser(pathUUID).subscribe((response: InfoResponse) => {
        this.snackBar.open('Your account activated successfylly', null, {
          duration: 4000
        });
        this.isChanging = true;
      },
       error =>{
        this.snackBar.open('Account activation Error! Try again', null, {
            duration: 5000
          });
          this.router.navigate(['/']);
      });;
  }

}
