import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPasswordChangeConfirmationComponent } from './client-password-change-confirmation.component';

describe('ClientPasswordChangeConfirmationComponent', () => {
  let component: ClientPasswordChangeConfirmationComponent;
  let fixture: ComponentFixture<ClientPasswordChangeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPasswordChangeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPasswordChangeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
