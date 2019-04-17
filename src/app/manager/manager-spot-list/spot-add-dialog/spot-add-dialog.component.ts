import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Spot} from "../../../model/view/spot";

@Component({
    selector: 'app-spot-add-dialog',
    templateUrl: './spot-add-dialog.component.html',
    styleUrls: ['./spot-add-dialog.component.css']
})
export class SpotAddDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<SpotAddDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Spot) {
    }

    ngOnInit() {
        this.data.isFree = false;
        this.data.spotNumber = 1;
        this.data.hasCharger = false;
        this.data.isInvalid = false;
        this.data.isBlocked = false;
    }

    onNoClick(): void {
        this.data.isFree = false;
    }

    onOkClick(): void {
        this.data.isFree = true;
    }

}
