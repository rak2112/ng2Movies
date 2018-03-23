import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private authSvc: AuthService){}
  @Input() public moviesFound;
  @Input() public userDetail;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onFocusOut: EventEmitter<any> = new EventEmitter();
  @Output() onLogOut: EventEmitter<any> = new EventEmitter();

  onFilterChange(name: string) {
    this.onChange.emit(name);
  }

  resetSelection() {
    this.onFocusOut.emit(null);
  }

  logOut(event) {
    this.onLogOut.emit(event);
  }
}
