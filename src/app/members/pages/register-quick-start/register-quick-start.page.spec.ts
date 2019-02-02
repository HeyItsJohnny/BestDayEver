import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuickStartPage } from './register-quick-start.page';

describe('RegisterQuickStartPage', () => {
  let component: RegisterQuickStartPage;
  let fixture: ComponentFixture<RegisterQuickStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterQuickStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterQuickStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
