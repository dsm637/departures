import { Component, OnInit } from '@angular/core';
import { DepartureboardService, Station } from '../_services/departureboard.service';
import { DepartureInfo } from '../_models/departureInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departures: DepartureInfo[];
  station: Station = 'place-north';

  constructor(private departureService: DepartureboardService) { }

  ngOnInit() {
    this.loadDepartures();
  }

  loadDepartures() {
    console.log(this.station);
    this.departureService.getDepartures(this.station, true, 10).subscribe((res: DepartureInfo[]) => {
      this.departures = res;
    }, error => {
      // TODO: process error
      console.error(error);
    });
  }

}
