import { Injectable } from '@angular/core';

declare let iziToast: any;

@Injectable()
export class UINotification {
  success(...settings: any[]) {
    let [title, message] = settings;
    iziToast.success({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 2000
    });
  }
  warning(...settings: any[]) {
    let [title, message] = settings;
    iziToast.warning({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 2000
    });
  }
}
