import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoritesAddConfigmDialogComponent} from './favorites-add-configm-dialog.component';

describe('FavoritesAddConfigmDialogComponent', () => {
    let component: FavoritesAddConfigmDialogComponent;
    let fixture: ComponentFixture<FavoritesAddConfigmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FavoritesAddConfigmDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritesAddConfigmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
