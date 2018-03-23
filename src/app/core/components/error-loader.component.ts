import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-laoder',
  template: `<div class="container error-loader">
              <div class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Sorry not able to complete your request.
                <p>Status: {{errorStatus.status}} ({{errorStatus.statusText}})</p>
                <p>Message: {{errorStatus._body}}</p>
              </div>
             <div>`,
  styles: [`
    .error-loader {
        margin-top: 3rem !important;
    }
  `]
})
export class ErrorComponent{
  constructor() {
  }
  @Input() errorStatus: string;
}

