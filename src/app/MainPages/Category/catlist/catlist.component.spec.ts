/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatlistComponent } from './catlist.component';

describe('CatlistComponent', () => {
  let component: CatlistComponent;
  let fixture: ComponentFixture<CatlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
