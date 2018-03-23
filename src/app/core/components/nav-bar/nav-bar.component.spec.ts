/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let mockAuthSvc;

  beforeEach(() => {
    component = new NavBarComponent(mockAuthSvc);
  });

  it('should call onChange when onFilterChange gets called', () => {
    spyOn(component.onChange, 'emit');
    component.onFilterChange(':name');
    expect(component.onChange.emit).toHaveBeenCalledWith(':name');
  });

  it('should call onFocusOut when resetSelection gets called', () => {
    spyOn(component.onFocusOut, 'emit');
    component.resetSelection();
    expect(component.onFocusOut.emit).toHaveBeenCalledWith(null);
  });

  it('should call logOut when onLogOut gets called', () => {
    spyOn(component.onLogOut, 'emit');
    component.logOut(':evt');
    expect(component.onLogOut.emit).toHaveBeenCalledWith(':evt');
  });
});
