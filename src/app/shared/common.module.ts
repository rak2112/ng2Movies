
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import { ModalComponent } from './modal/modal.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';

import {
	ErrorComponent,
  LoaderComponent,
  Tab,
  Tabs,
  MovieComponent,
  MovieListComponent,
	MoviesPaginationComponent,
	FilterComponent,
	ModalTriggerDirective,
	NameInitialsPipe
} from './index';


const DECLARATIONS = [
	ErrorComponent,
	FilterComponent,
  LoaderComponent,
  Tab,
  Tabs,
  MovieComponent,
  MovieListComponent,
	MoviesPaginationComponent,
	ModalComponent,
	MultiSelectComponent,
	ModalTriggerDirective,
	NameInitialsPipe
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    NgbModule.forRoot(),
  ],
  exports:[...DECLARATIONS]
})
export class SharedModule { }
