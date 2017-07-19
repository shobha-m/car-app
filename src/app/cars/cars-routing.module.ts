import  { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarsComponent } from './cars.component';

@NgModule({
    imports:[
        RouterModule.forChild([{ path: '' , component: CarsComponent}])
    ],
    exports:[RouterModule]
})
export class CarsRoutingModule{

}