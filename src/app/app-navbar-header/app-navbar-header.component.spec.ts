import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarHeaderComponent } from './app-navbar-header.component';

describe('AppNavbarHeaderComponent', () => {
  let component: AppNavbarHeaderComponent;
  let fixture: ComponentFixture<AppNavbarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavbarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
