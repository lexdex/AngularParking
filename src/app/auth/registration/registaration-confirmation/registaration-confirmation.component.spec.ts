import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarationConfirmationComponent } from './registaration-confirmation.component';

describe('RegistarationConfirmationComponent', () => {
  let component: RegistarationConfirmationComponent;
  let fixture: ComponentFixture<RegistarationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
