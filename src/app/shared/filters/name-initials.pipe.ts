import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nameInitials'})

export class NameInitialsPipe implements PipeTransform {
  transform(name: string, args: string[]): any {
    return name.split(' ').map((string) => string.charAt(0)).join('').toUpperCase();
  }
}
