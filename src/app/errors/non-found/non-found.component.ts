import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-non-found',
  templateUrl: './non-found.component.html',
  styleUrls: ['./non-found.component.css']
})
export class NonFoundComponent implements OnInit {
  appUrl = environment.angularUrl;

  constructor() { }

  ngOnInit() {
  }

}
