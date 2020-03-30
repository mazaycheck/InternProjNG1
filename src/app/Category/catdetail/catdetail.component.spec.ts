/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatdetailComponent } from './catdetail.component';

describe('CatdetailComponent', () => {
  let component: CatdetailComponent;
  let fixture: ComponentFixture<CatdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
