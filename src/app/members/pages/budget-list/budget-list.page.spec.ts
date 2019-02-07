import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetListPage } from './budget-list.page';

describe('BudgetListPage', () => {
  let component: BudgetListPage;
  let fixture: ComponentFixture<BudgetListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
