import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpotAddDialogComponent} from './spot-add-dialog.component';

describe('SpotAddDialogComponent', () => {
    let component: SpotAddDialogComponent;
    let fixture: ComponentFixture<SpotAddDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpotAddDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpotAddDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
