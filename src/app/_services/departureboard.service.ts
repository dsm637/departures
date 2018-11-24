import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartureInfo } from '../_models/departureInfo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type Station = 'place-north' | 'place-sstat';

@Injectable()
export class DepartureboardService {
    baseUrl = 'https://api-v3.mbta.com/';

    constructor(private http: HttpClient) { }

    getDepartures(station: Station, isOutBound: boolean, numberOfRecords: number): Observable<DepartureInfo[]> {
        let params = new HttpParams();
        params = params.append('filter[stop]', station);
        params = params.append('include', 'route,stop');
        params = params.append('filter[route_type]', '2');
        params = params.append('page[limit]', '10');
        params = params.append('sort', 'departure_time');
        params = params.append('filter[direction_id]', isOutBound ? '0' : '1');

        return this.http.get(`${ this.baseUrl }predictions`, { observe: 'response', params })
            .pipe(
                map(response => {
                    console.dir(response);

                    return [
                        { departureTime: new Date(), destination: 'Portland', trainNumber: 697, status: 'ON TIME', },
                        { departureTime: new Date(), destination: 'Newburyport', trainNumber: 2169, status: 'ON TIME', },
                        { departureTime: new Date(), destination: 'Lowell', trainNumber: 697, status: 'ON TIME', },
                        { departureTime: new Date(), destination: 'Fitchurg', trainNumber: 2413, status: 'ON TIME', },
                        { departureTime: new Date(), destination: 'Rockport', trainNumber: 2121, status: 'ON TIME', },
                    ];
                })
            );


    }
}
