import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../auth.service';
import { Store } from '@ngrx/store';
import { IStore, ILogin } from './../../shared/dataModels/index';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router }   from '@angular/router';


@Component({
  selector: 'app-login-user',
  template: `<app-login-form
              [userDetail]="userDetail$ | async"
              (onChange)='onChange($event)'
              (onAuth)='onAuth()'
              (cancel)="onCancel()"></app-login-form>`,
  styles: [`
    .container {
      margin-top: 40px;
      padding: 20px;
      background: #eaeaea;
    }
    .btn {
      height: 60px;
      width: 100%;
      margin-top: 10px;
    }
    .form-control {
      height: 60px;
    }
  `]
})

export class LoginComponent implements ILogin{
  hasAuth: boolean;
  userDetail$: Observable<any>;
  constructor(private authSvc: AuthService, private store: Store<IStore>, private router: Router) {
    this.userDetail$ = this.store.select('authenticateUser');
  }
  onChange(form): void {
    this.authSvc.authenticateUser(form);
  }
  onCancel(): void {
    this.router.navigate(['home']);
  }
  onAuth(): void {
    this.router.navigate(['movies']);
  }
}
