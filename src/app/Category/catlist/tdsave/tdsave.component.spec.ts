/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TdsaveComponent } from './tdsave.component';

describe('TdsaveComponent', () => {
  let component: TdsaveComponent;
  let fixture: ComponentFixture<TdsaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdsaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
