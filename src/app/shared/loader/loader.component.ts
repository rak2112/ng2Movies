import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="container loader">
               <div class="loader alert alert-info" role="alert">
                <i class="fa fa-repeat gly-spin"></i>
                <span>Loading....</span>
               </div>
             </div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

}
