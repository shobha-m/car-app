import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CarsComponent } from './cars.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CarFilterPipe } from '../pipes/car.filter.pipe';


@NgModule({
    declarations: [ 
        CarsComponent ,
        CarFilterPipe],
    imports: [
        CommonModule ,
        CarsRoutingModule,
        HttpModule, 
        FormsModule]
})
export class CarsModule{

}