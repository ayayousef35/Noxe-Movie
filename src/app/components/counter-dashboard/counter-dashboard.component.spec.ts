import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDashboardComponent } from './counter-dashboard.component';

describe('CounterDashboardComponent', () => {
  let component: CounterDashboardComponent;
  let fixture: ComponentFixture<CounterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterDashboardComponent]
    });
    fixture = TestBed.createComponent(CounterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
