import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestListPage } from './guest-list.page';

describe('GuestListPage', () => {
  let component: GuestListPage;
  let fixture: ComponentFixture<GuestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
