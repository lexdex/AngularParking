import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatCheckbox} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {TokenStorage} from '../../../auth/token/token-storage';

@Component({
    selector: 'app-parking-list-filter-favorite-field',
    templateUrl: './favorite-checkbox.component.html',
    styleUrls: ['./favorite-checkbox.component.css']
})
export class FavoriteCheckboxComponent implements OnInit {

    @ViewChild('favorite')
    private favorite: MatCheckbox;
    private readonly valueChangesSubject = new Subject<boolean>();
    public readonly valueChanges = this.valueChangesSubject.asObservable();

    constructor(private changeDetector: ChangeDetectorRef,
                private tokenStorage: TokenStorage) {
    }

    public get value(): boolean {
        return this.favorite.checked;
    }

    ngOnInit() {
        if (localStorage.getItem('favorite')) {
            this.favorite.checked = (localStorage.getItem('favorite') === 'true');
        }
        this.refreshComponentView();
    }

    public onChange(): void {
        this.valueChangesSubject.next(this.favorite.checked);
    }

    private refreshComponentView(): void {
        this.changeDetector.detectChanges();
        setTimeout(() => this.changeDetector.detectChanges(), 1);
    }

    hasToken(): boolean {
        return this.tokenStorage.hasToken();
    }
}
