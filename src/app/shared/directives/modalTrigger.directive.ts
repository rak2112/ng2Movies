import { Directive, OnInit, ElementRef, Input, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective{
  private el: HTMLElement;
  @Input('modal-trigger') modalInput: string;
  @Input() videoModal : string;
  constructor(private modalService: NgbModal, ref: ElementRef) {
    this.el = ref.nativeElement;
  }

  @HostListener('click') onClick() {
    this.openModal(null);
  }

  openModal(viewType) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalInput = this.modalInput;
    modalRef.componentInstance.hasVideo = (this.videoModal === 'true') ? true: false;
  }
}
