import {
   async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { CarData } from '../models/car-data.model';
import { CarService as carService } from './car.service';

const makeCarData = () => [
 {"color": "red", "type": "Porsche 911", "yearOfConstruction": 2000, "price": 60000},
    {"color": "black", "type": "Porsche Panamera", "yearOfConstruction": 2010, "price": 120000},
    {"color": "green", "type": "VW Beetle", "yearOfConstruction": 1960, "price": 8000, "notes": "damaged at the front bumper"},
    {"color": "blue", "type": "Audi A5", "yearOfConstruction": 1998, "price": 28345},
    {"color": "yellow", "type": "Ferrari 430 Spider", "yearOfConstruction": 1990, "price": 80435},
    {"color": "gray", "type": "Audi Commodore", "yearOfConstruction": 1992, "price": 8212},
] as CarData[];



////////  Tests  /////////////


describe('CarService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        carService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([carService], (service: carService) => {
      expect(service instanceof carService).toBe(true);
  }));



  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new carService(http);
    expect(service instanceof carService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when getCars', () => {
      let backend: MockBackend;
      let service: carService;
      let fakeCars: CarData[];
      let response: Response;

      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new carService(http);
        fakeCars = makeCarData();
        let options = new ResponseOptions({status: 200, body: {data: fakeCars}});
        response = new Response(options);
      }));

      it('should have expected fake cars (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getCars().toPromise()
        // .then(() => Promise.reject('deliberate'))
          .then(cars => {
            expect(cars.length).toBe(fakeCars.length,
              'should have expected no. of cars');
          });
      })));

      it('should have expected fake cars (Observable.do)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getCars()
          .do(cars => {
            expect(cars.length).toBe(fakeCars.length,
              'should have expected no. of cars');
          })
          .toPromise();
      })));


      it('should be OK returning no cars', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getCars()
          .do(cars => {
            expect(cars.length).toBe(0, 'should have no cars');
          })
          .toPromise();
      })));

      it('should treat 404 as an Observable error', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getCars()
          .do(cars => {
            fail('should not respond with cars');
          })
          .catch(err => {
            expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
            return Observable.of(null); // failure is the expected test result
          })
          .toPromise();
      })));
  });
});