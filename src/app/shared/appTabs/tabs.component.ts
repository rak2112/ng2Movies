import { Component, ContentChildren, QueryList, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs">
        <a href="" (click)="selectTab($event, tab)" [class.active]="tab.active">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [`
      .nav-tabs {
        background: #292b2c;
        padding-left: 40px;
      }
      .nav-tabs > li {
        width: auto;
      }
      .nav-tabs li>a {
        background: #292b2c;
        color: #ff5c00;
        display: inline-block;
        padding:8px 25px;
        text-decoration: none;

      }
      .nav-tabs li > a.active {
        border-bottom: 5px solid #ff5c00;
      }
  `],
  encapsulation: ViewEncapsulation.None
})
export class Tabs implements AfterContentInit {

  @ContentChildren(Tab) tabs: QueryList<Tab>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(null, this.tabs.first);
    }
  }

  selectTab(event, tab: Tab){ console.log('evt', event, 'tab', tab)
    if(event) {
      event.preventDefault();
    }
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }

}
