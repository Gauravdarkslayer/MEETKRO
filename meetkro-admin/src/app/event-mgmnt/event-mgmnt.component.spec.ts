import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMgmntComponent } from './event-mgmnt.component';

describe('EventMgmntComponent', () => {
  let component: EventMgmntComponent;
  let fixture: ComponentFixture<EventMgmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMgmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
