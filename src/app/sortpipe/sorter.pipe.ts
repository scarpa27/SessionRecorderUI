import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sorter'
})
export class SorterPipe implements PipeTransform {

    transform(input: any[], col: string, reverse: boolean): any[] {
        let output = input.sort(
            (a, b) => {
                if (typeof a[col] == "number")
                    return a[col] - b[col];
                return a[col].localeCompare(b[col]);
            })

        if (reverse) return output.reverse();
        return output;
    }

}
