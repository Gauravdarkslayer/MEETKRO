import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMgmntComponent } from './application-mgmnt.component';

describe('ApplicationMgmntComponent', () => {
  let component: ApplicationMgmntComponent;
  let fixture: ComponentFixture<ApplicationMgmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationMgmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
