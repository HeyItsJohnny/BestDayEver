import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRsvpExamplePage } from './guest-rsvp-example.page';

describe('GuestRsvpExamplePage', () => {
  let component: GuestRsvpExamplePage;
  let fixture: ComponentFixture<GuestRsvpExamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRsvpExamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRsvpExamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
