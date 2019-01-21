import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSetupPage } from './venue-setup.page';

describe('VenueSetupPage', () => {
  let component: VenueSetupPage;
  let fixture: ComponentFixture<VenueSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueSetupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
