import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMgmntComponent } from './content-mgmnt.component';

describe('ContentMgmntComponent', () => {
  let component: ContentMgmntComponent;
  let fixture: ComponentFixture<ContentMgmntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentMgmntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentMgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
