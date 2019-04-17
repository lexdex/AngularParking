import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-favorites-add-configm-dialog',
    templateUrl: './favorites-add-configm-dialog.component.html',
    styleUrls: ['./favorites-add-configm-dialog.component.css']
})
export class FavoritesAddConfigmDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<FavoritesAddConfigmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: FavoriteAddData,
    ) {  }

    ngOnInit() {
    }

    onNoClick(): void {
        this.data.confirmed = false;
    }

    onOkClick(): void {
        this.data.confirmed = true;
    }

}

export class FavoriteAddData {
    public name: string = '';
    public confirmed: boolean;
}
