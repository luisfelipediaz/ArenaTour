import { Pipe, PipeTransform } from '@angular/core';
import { Team } from './app.model';

@Pipe({
  name: 'team'
})
export class TeamPipe implements PipeTransform {

  transform(value: Team, ...args: any[]): any {
    return `${value.club} - ${value.duplaNumber || value.duplanumber} - ${value.gender}`;
  }

}
