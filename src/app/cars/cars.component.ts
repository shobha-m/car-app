import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarData } from '../models/car-data.model';


@Component({
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.css']
     
})
export class CarsComponent implements OnInit{
  constructor(private carService:CarService) {}
  cars: CarData[];
  numberOfCars: number;
  limit: number;
  page: number = 1;
  filter: CarData = new CarData();
 ngOnInit() {
 
    this.carService.getCars().subscribe(
      (cars: CarData[]) => {
        this.cars = cars;
        this.numberOfCars = this.cars.length;
        this.limit = this.cars.length; // Start off by showing all cars on a single page.
      });
  }
}