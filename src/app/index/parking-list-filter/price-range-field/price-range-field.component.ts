import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {isValid} from 'ngx-bootstrap/chronos/create/valid';

@Component({
    selector: 'app-parking-list-filter-price-range-field',
    templateUrl: './price-range-field.component.html',
    styleUrls: ['./price-range-field.component.css']
})
export class PriceRangeFieldComponent implements OnInit {

    @ViewChild('minInput') minInput: HTMLInputElement;

    @ViewChild('maxInput') maxInput: HTMLInputElement;

    readonly minControl: FormControl = new FormControl();

    readonly maxControl: FormControl = new FormControl();

    private readonly valueChangesSubject = new Subject<PriceRange>();

    public readonly valueChanges = this.valueChangesSubject.asObservable();

    private internalValue: PriceRange;

    public minIsValid = true;
    public maxIsValid = true;

    constructor() {
    }

    public get value(): PriceRange {
        return this.internalValue;
    }

    ngOnInit(): void {

        this.valueChanges.subscribe(value => this.internalValue = value);
        this.minControl.valueChanges.subscribe(min => {
            if (this.validateMin(min)) {
                this.valueChangesSubject.next(new PriceRange(min, this.maxControl.value));
                this.minIsValid = true;
            }
        });
        this.maxControl.valueChanges.subscribe(max => {
            if (this.validateMax(max)) {
                this.valueChangesSubject.next(new PriceRange(this.minControl.value, max));
                this.maxIsValid = true;
            }
        });
        if (this.validateMin(+localStorage.getItem('minValue'))) {
            this.minControl.setValue(localStorage.getItem('minValue'));
            this.minIsValid = true;
        }
        if (this.validateMax(+localStorage.getItem('maxValue'))) {
            this.maxControl.setValue(localStorage.getItem('maxValue'));
            this.maxIsValid = true;
        }
        this.minControl.markAsTouched();
        this.maxControl.markAsTouched();
    }

    private validateMin(min: number | null): boolean {
        const max = this.maxControl.value;
        if (min) {
            if (min < 0) {
                this.minControl.setErrors({'lessThanZero': min});
                this.minIsValid = false;
                return false;
            } else if (max && min > max) {
                this.minControl.setErrors({'greaterThanMax': min});
                this.maxControl.setErrors(null);
                this.minIsValid = false;
                return false;
            }
            if (min > 1000) {
                this.minControl.setErrors({'greaterThan1000': min});
                this.minIsValid = false;
                return false;
            }
            this.minIsValid = true;

        }
        return this.maxControl.errors === null;
    }

    private validateMax(max: number | null): boolean {
        const min = this.minControl.value;
        if (max) {
            if (max < 0) {
                this.maxControl.setErrors({'lessThanZero': max});
                this.maxIsValid = false;
                return false;
            }
            if (min && max < min) {
                this.maxControl.setErrors({'lessThanMin': max});
                this.minControl.setErrors(null);
                this.maxIsValid = false;
                return false;
            }
            if (max > 1000) {
                this.maxControl.setErrors({'greaterThan1000': max});
                this.maxIsValid = false;
                return false;
            }
        }
        return this.minControl.errors === null;
    }
}

export class PriceRange {

    public readonly min: number;
    public readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}
