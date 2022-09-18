import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMgmntComponent } from './payment-mgmnt.component';

describe('PaymentMgmntComponent', () => {
  let component: PaymentMgmntComponent;
  let fixture: ComponentFixture<PaymentMgmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMgmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
