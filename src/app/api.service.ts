import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  //private observable: Observable<any>;
  //private service: any;
  private cont: number = 0;
  private config

  constructor(
    private http: Http
  ) { }

  getData(url, service, dataKey, map?) {
    console.log(this.cont++ + " url: "+url);
    if(!!service[dataKey]) {
      // if `data` is available just return it as `Observable`
      return Observable.of(service[dataKey]);
    } else if (service.observable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return service.observable;
    } else {
      // create the request, store the `Observable` for subsequent subscribers
      service.observable = this._fetchData(url, service, dataKey);
      return service.observable;
    }
  }

  _fetchData(url, service, dataKey, map?) {
    console.log('_fetchData');
    return this.http.get(url)
      .map(response => {
        service.observable = null;
        if (response.status == 400) {
          // return "FAILURE"
        } else {
          service[dataKey] = response.json();
          if(map) {
            map(service[dataKey])
          }
          return service[dataKey];
        }
      })
      .share();
  }


}
