import {Pipe, PipeTransform} from "@angular/core";
//import {DateFormatter} from '@angular/src/facade/intl';

@Pipe({
    name: 'formatisostring'
})
export class FormatISOStringPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
        	var date = Date.parse(value);
        	return date;
            //var date = value instanceof Date ? value : new Date(value);
            //return DateFormatter.format(date, 'pt', 'dd/MM/yyyy');
        }
    }
}