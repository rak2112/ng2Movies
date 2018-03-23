import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../core/models/index';



@Component({
  selector: 'app-login-form',
  template: `<div class="container col-md-4">
      <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.value)" novalidate>
        <div class="form-group">
          <input type="text" (ngModel)="userName" name="userName" class="form-control" placeholder="TMDB User" required>
          <em *ngIf="loginForm.controls.userName?.invalid && loginForm.controls.userName?.touched">Required</em>
        </div>
        <div class="form-group">
          <input type="password" (ngModel)="password" name="password" class="form-control" placeholder="Password" required>
          <em *ngIf="loginForm.controls.password?.invalid && loginForm.controls.password?.touched">Required</em>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Log in</button>
        <button type="button" class="btn btn-default" (click)="onCancel()">Cancel</button>
    </form>
  </div>`,
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
    em {
      color: #cc0000;
      padding: 5px;
    }
  `]
})

export class LoginFormComponent {

  @Input() userDetail : IUser;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() onAuth: EventEmitter<any> = new EventEmitter();

  onSubmit(details): void {
    this.onChange.emit(details);
  }
  onCancel(): void {
    this.cancel.emit(null);
  }
  ngOnChanges(): void {
    if(this.userDetail.hasUserCredentials) {
      this.onAuth.emit();
    }
  }
}
