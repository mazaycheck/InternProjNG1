/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TownListComponent } from './townList.component';

describe('TownListComponent', () => {
  let component: TownListComponent;
  let fixture: ComponentFixture<TownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
