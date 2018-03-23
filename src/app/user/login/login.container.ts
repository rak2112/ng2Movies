import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { ILogin, IStore } from '../../core/models/index';

import * as usersEntitiesAction from '../../core/actions';
import { State } from './../../core/reducers';
import { getUser } from './../../core/selectors';


@Component({
  selector: 'app-login-user',
  template: `<app-login-form
              [userDetail]="userDetail$ | async"
              (onChange)='onLogin($event)'
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

export class LoginContainer implements ILogin{
  hasAuth: boolean;
  userDetail$: Observable<any>;
  constructor(private authSvc: AuthService, private store: Store<State>, private router: Router) {
    this.userDetail$ = store.select(getUser);
  }
  onLogin(form): void {
		//this.authSvc.authenticateUser(form);
		this.store.dispatch(new usersEntitiesAction.TryLogIn(form))
  }
  onCancel(): void {
    this.router.navigate(['home']);
  }
  onAuth(): void {
    this.router.navigate(['movies']);
  }
}
