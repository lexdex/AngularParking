import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientProfileEditPasswordComponent} from './client-profile-edit-password.component';

describe('ClientProfileEditPasswordComponent', () => {
    let component: ClientProfileEditPasswordComponent;
    let fixture: ComponentFixture<ClientProfileEditPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientProfileEditPasswordComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClientProfileEditPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
