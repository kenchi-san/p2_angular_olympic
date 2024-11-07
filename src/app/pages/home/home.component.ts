import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from 'src/app/core/models/Olympic';
import {participation} from "../../core/models/Participation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: OlympicCountry[] = [];
  totalCountries: number = 0;
  pieChartData: any[] = [];
  colorScheme:string = 'cool'

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(data => {
      if (data) {
        this.items = data;


        this.pieChartData = this.items.map(item => {

          if (item && item.country && item.participations != null) {
            const totalMedals: number = item.participations.reduce((total: number, participation: participation): number => {
              return total + participation.medalsCount;
            }, 0);
            return {
              name: item.country,
              value: totalMedals
            };
          }
          return null;
        }).filter(item => item !== null);
        this.totalCountries = this.items.length;
      }
    });

  }
}
