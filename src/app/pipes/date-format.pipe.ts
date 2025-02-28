import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat' 
})
export class DateFormatPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: string | Date, format: string = 'dd/MM/yyyy - HH:mm'): string {
    if (!value) return 'N/A'; 
    return this.datePipe.transform(value, format) || 'N/A';
  }
}