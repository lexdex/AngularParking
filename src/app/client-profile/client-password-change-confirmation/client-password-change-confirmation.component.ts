import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../clients/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordData } from '../client-profile-edit-password/password-data';
import { InfoResponse } from '../../auth/info-response';
import { MatSnackBar } from '@angular/material';

const NEW_PASSWORD = 'new_password';
const UUID_PASSWORD_CONFIRM = 'uuid_password_confirm';

@Component({
  selector: 'app-client-password-change-confirmation',
  templateUrl: './client-password-change-confirmation.component.html',
  styleUrls: ['./client-password-change-confirmation.component.css']
})
export class ClientPasswordChangeConfirmationComponent implements OnInit {

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
      this.clientService.updateClientPassword(pathUUID).subscribe((response: InfoResponse) => {
        this.snackBar.open('Password changed successfully!', null, {
          duration: 4000
        });
        this.isChanging = true;
      },
       error =>{
        this.snackBar.open('Password changing Error! Try again', null, {
            duration: 5000
          });
          this.router.navigate(['/']);
      });;
  }

}
