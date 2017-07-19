import { BrowserModule} from '@angular/platform-browser';
import  { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PricePipe} from './pipes/price.pipe';
import { ArrayPipe } from './pipes/array.filter.pipe';
import { FilterPipe} from './pipes/filter.pipe';
import { CarService } from './services/car.service';
import { FilterUniquePipe } from './pipes/unique.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PricePipe,
        ArrayPipe,
        FilterPipe,
        FilterUniquePipe
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule, 
        FormsModule
        ],
    providers: [
        CarService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule{}