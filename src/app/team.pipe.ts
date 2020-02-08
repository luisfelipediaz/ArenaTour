import { Pipe, PipeTransform } from '@angular/core';
import { Team } from './app.model';

@Pipe({
  name: 'team'
})
export class TeamPipe implements PipeTransform {

  transform(value: Team, ...args: any[]): any {
    if (args[0] === 'all') {
      return `${value.club} - ${value.duplaNumber || value.duplanumber}${value.gender}`;
    }

    return `${value.club.slice(0, 3)} - ${value.duplaNumber || value.duplanumber}${value.gender}`;
  }

}
