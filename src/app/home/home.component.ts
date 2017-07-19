import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarData } from '../models/car-data.model';
import { PricePipe } from '../pipes/price.pipe';
import { CarFilterPipe } from '../pipes/car.filter.pipe';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private carService: CarService) { }
  cars: CarData[] = [];
  sliderValue: number = 100;
  catgArray: Array<string>;
  typeArray: Array<string>;
  filterArr = [];
  colorfilter: Boolean = false;
  typefilter: Boolean = false;
  filtercars = [];

  ngOnInit() {
    this.carService.getCars().subscribe(
      (cars: CarData[]) => {
        this.cars = cars;
        this.catgArray = this.filterlist((this.hasDuplicates(cars.map(cars => cars.color))));
        this.typeArray = this.filterlist((this.hasDuplicates(cars.map(cars => cars.type))));
        this.filtercars = this.cars;
      });
  }
  /**
   * filterlist create the array for catgs filters
   * @param array 
   */
  filterlist(array) {
    return array.map(function (element) {
      return { status: element, checked: false };
    });
  }
  /**
   * hasDuplicates checks if any updates 
   * @param array 
   */
  hasDuplicates(array) {
    return array.filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    });
  }

  /**
   * updateFilter to filter the car list
   * @param filter get the checkbox filter value
   */
  updateFilter(filter) {
    // console.log(filter);
    if (filter.checked) {
      this.filterArr.push(filter.status)
      //console.log(this.filterArr)
    }
    else {
      let index = this.filterArr.indexOf(filter.status)
      this.filterArr.splice(index, 1)
    }
    this.colorfilter = this.checkfiltertype(this.catgArray);
    this.typefilter = this.checkfiltertype(this.typeArray);
    // console.log(this.colorfilter + '--checkedfilter---' + this.typefilter);
    this.updateResult(this.colorfilter, this.typefilter);

  }

/**
 * updateResult function to display the result based on filters
 * combination  or and of colorfilter, typefilter
 * @param colorfilter 
 * @param typefilter 
 */

  updateResult(colorfilter, typefilter) {

    if ((colorfilter && typefilter) || (!colorfilter && !typefilter)) {
      this.filtercars = this.cars.filter(a => {
        return this.filterArr.length ? this.filterArr.indexOf(a.color) != -1 && this.filterArr.indexOf(a.type) != -1 : this.cars
      });
    }

    if (!colorfilter && typefilter) {
      this.filtercars = this.cars.filter(a => {
        return this.filterArr.length ? this.filterArr.indexOf(a.type) != -1 : this.cars
      });
    }
    if (colorfilter && !typefilter) {
      this.filtercars = this.cars.filter(a => {
        return this.filterArr.length ? this.filterArr.indexOf(a.color) != -1 : this.cars
      });
    }
  }
  /**
   * 
   *  @checkfiltertype is to check is any checkboxes are checked
   */
  checkfiltertype(catg) {
    let colorcheck = false;
    catg.map(function (obj) {
      if (obj.checked === true) {
        colorcheck = true; //set the flag again
        // console.log('checked');
      }
    })
    if (colorcheck === false) {
      // console.log('atleast one checkbox should be checked');
    }
    return colorcheck;
  }


}