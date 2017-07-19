import {Pipe} from '@angular/core';

@Pipe({
  name: 'ArrayPipe'
})
export class ArrayPipe {

  transform(values: Array<any>, args:any[]):any {
    if (!values)
      return values;
        return values.filter((value) => {
            for (let i = 0; i < args.length; i++) {
                if (value[args[i][0]] != args[i][1]) {
                    return false;
                }
            }
            return true;
        });
    }
  
  
}

