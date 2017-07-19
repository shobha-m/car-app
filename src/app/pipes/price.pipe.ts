import {Pipe} from '@angular/core';

@Pipe({
  name: 'PricePipe'
})
export class PricePipe {

  transform(value: any[], args?: string): any[] {
    //let [minPrice] = args;
    if (!value)
        return value;
    return value.filter(CarData => {
      return CarData.price >= args;
    });
  }
  
}
