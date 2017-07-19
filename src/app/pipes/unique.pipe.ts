import {  Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterUniquePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log(value);
    // Remove the duplicate elements
     if (!value)
        return value;
    let uniqueArray = value.filter(function (el, index, array) { 
      return array.indexOf (el) == index;
    });
    // allTodos.filter(todo => todo.isCompleted);

  //  let uniqueArray = Array.from(new Set(value));  
    return uniqueArray;
  }

}