import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubscriberComponent } from './order-subscriber.component';

describe('OrderSubscriberComponent', () => {
  let component: OrderSubscriberComponent;
  let fixture: ComponentFixture<OrderSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
