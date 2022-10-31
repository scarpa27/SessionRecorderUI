import { Pipe, PipeTransform } from '@angular/core';
import {ProjectDTO} from "../model/projectDTO.model";

@Pipe({
  name: 'frula'
})
export class FrulaPipe implements PipeTransform {

    elapsed(el: number): string {
        const hh = Math.floor(el / 1000 / 60 / 60);
        el -= hh * 1000 * 60 * 60;
        const mm = Math.floor(el / 1000 / 60);
        el -= mm * 1000 * 60;
        const ss = Math.floor(el / 1000);

        return hh + ":" + ("0"+mm).slice(-2) + ":" + ("0"+ss).slice(-2);
    }

  transform(input: ProjectDTO[]): any[] {
    return input.map(x => x.sessionDTOList.map(y => ({
        a: y.project_name,
        b: new Date(y.start).toLocaleString("hr-HR"),
        c: new Date(y.end).toLocaleString("hr-HR"),
        d: this.elapsed(y.end - y.start),
        e: y.start,
        f: y.end
    }))).flat().sort((a, b) => (b.f - a.f));
  }

}
