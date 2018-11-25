import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartureInfo } from '../_models/departureInfo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type Station = 'place-north' | 'place-sstat';
export type Direction = '0' | '1';

interface PredictionResponse {
    data: any[];
    included: any[];
}

@Injectable()
export class DepartureboardService {
    baseUrl = 'https://api-v3.mbta.com/';

    constructor(private http: HttpClient) { }

    getDepartures(station: Station, direction: Direction, numberOfRecords: number): Observable<DepartureInfo[]> {
        let params = new HttpParams();
        params = params.append('filter[stop]', station);
        params = params.append('include', 'route,stop');
        params = params.append('filter[route_type]', '2');
        params = params.append('page[limit]', numberOfRecords.toString());
        if (direction === '0') {
            params = params.append('sort', 'departure_time');
        } else {
            params = params.append('sort', 'arrival_time');
        }
        params = params.append('filter[direction_id]', direction);

        return this.http.get(`${ this.baseUrl }predictions`, { observe: 'response', params })
            .pipe(
                map(response => {
                    const p: PredictionResponse = <PredictionResponse>response.body;

                    console.dir(response);

                    // preparing routes info
                    const routeNames = new Map<string, string>();
                    for (const i of p.included) {
                        routeNames[i.id] = i.attributes.long_name;
                    }

                    const result: DepartureInfo[] = [];
                    for (const d of p.data) {
                        const r: DepartureInfo = {
                            time: direction === '0' ?
                                d.attributes.departure_time :
                                d.attributes.arrival_time,
                            destination: routeNames[d.relationships.route.data.id],
                            status: d.attributes.status,
                            // TODO: add train number
                            trainNumber: -1,
                        };

                        result.push(r);
                    }

                    return result;
                })
            );
    }
}
