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
  @Input() videoKey;
  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) { console.log('this', this);

  }

  ngOnInit() {
    console.log('thisssss', this.videoKey);
    let url = `http://www.youtube.com/embed/${this.videoKey}?autoplay=1`; console.log('url',url)
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log('hereee', this.trustedUrl)
  }

}
