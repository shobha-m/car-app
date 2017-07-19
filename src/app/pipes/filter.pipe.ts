import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filterPipe', pure: false })
export class FilterPipe implements PipeTransform {

  transform(values: any, args?: any[]): any[] {
      console.log(values);
    if (!values)
      return values;
    return values = values.filter(a => {
      return args.length ? args.indexOf(a.color) != -1 || args.indexOf(a.type) != -1 : values;
      //  }

    });

  }
}