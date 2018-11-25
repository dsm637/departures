import { Component, OnInit } from '@angular/core';
import { DepartureboardService, Station, Direction } from '../_services/departureboard.service';
import { DepartureInfo } from '../_models/departureInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departures: DepartureInfo[];
  station: Station = 'place-sstat';
  direction: Direction = '0';
  lastUpdated: Date;

  constructor(private departureService: DepartureboardService) { }

  ngOnInit() {
    this.loadDepartures();
  }

  loadDepartures() {
    console.log(`${ this.station } to ${ this.direction } selected`);
    this.departureService.getDepartures(this.station, this.direction, 10).subscribe((res: DepartureInfo[]) => {
      this.departures = res;
      this.lastUpdated = new Date();
    }, error => {
      // TODO: process error
      console.error(error);
      this.lastUpdated = new Date();
    });
  }

}
