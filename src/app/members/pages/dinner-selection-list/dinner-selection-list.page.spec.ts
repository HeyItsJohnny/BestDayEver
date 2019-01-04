import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinnerSelectionListPage } from './dinner-selection-list.page';

describe('DinnerSelectionListPage', () => {
  let component: DinnerSelectionListPage;
  let fixture: ComponentFixture<DinnerSelectionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerSelectionListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinnerSelectionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
