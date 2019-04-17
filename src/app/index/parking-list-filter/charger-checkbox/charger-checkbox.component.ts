import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatCheckbox} from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-parking-list-filter-charger-field',
    templateUrl: './charger-checkbox.component.html',
    styleUrls: ['./charger-checkbox.component.css']
})
export class ChargerCheckboxComponent implements OnInit {

    @ViewChild('hascharger')
    private hasCharger: MatCheckbox;
    private readonly valueChangesSubject = new Subject<boolean>();
    public readonly valueChanges = this.valueChangesSubject.asObservable();

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    public get value(): boolean {
        return this.hasCharger.checked;
    }

    ngOnInit() {
        if (localStorage.getItem('hasCharger')) {
            this.hasCharger.checked = (localStorage.getItem('hasCharger') === 'true');
        }
        this.refreshComponentView();
    }

    public onChange(): void {
        this.valueChangesSubject.next(this.hasCharger.checked);
    }

    private refreshComponentView(): void {
        this.changeDetector.detectChanges();
        setTimeout(() => this.changeDetector.detectChanges(), 1);
    }
}
