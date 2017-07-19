import { Pipe, PipeTransform } from '@angular/core';

import { CarData } from '../models/car-data.model';

@Pipe({
    name: 'carfilter',
    pure: false
})
export class CarFilterPipe implements PipeTransform {
  transform(items: CarData[], filter: CarData): CarData[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: CarData) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {CarData} car The car to compare to the filter.
   * @param {CarData} filter The filter to apply.
   * @return {boolean} True if car satisfies filters, false if not.
   */
  applyFilter(car: CarData, filter: CarData): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (car[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (car[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
