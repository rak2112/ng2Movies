import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  trustedUrl: any;
  @Input() modalInput: string;
  @Input() hasVideo: string;
  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if(this.hasVideo) {
      let url = `http://www.youtube.com/embed/${this.modalInput}?autoplay=1`;
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
