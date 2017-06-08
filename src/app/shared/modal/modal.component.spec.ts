/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let mockNgbModal, mockSanitizer;

  beforeEach(() => {
    mockSanitizer = jasmine.createSpyObj(mockSanitizer, ['bypassSecurityTrustResourceUrl']);
    mockSanitizer.bypassSecurityTrustResourceUrl.and.returnValue(':someSanitizedUrl');
    component = new ModalComponent(mockNgbModal, mockSanitizer);
  });

  it('should create trustedUrl on ngInit', () => {
    component.hasVideo = 'true';
    component.ngOnInit();
    expect(component.trustedUrl).toBe(':someSanitizedUrl');
  });
});
