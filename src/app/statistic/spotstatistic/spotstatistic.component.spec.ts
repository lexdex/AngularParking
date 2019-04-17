import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotstatisticComponent } from './spotstatistic.component';

describe('SpotstatisticComponent', () => {
  let component: SpotstatisticComponent;
  let fixture: ComponentFixture<SpotstatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotstatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotstatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
