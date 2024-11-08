import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  participationData: OlympicCountry | null = null;
  items: any[] = [];
  lineChartData: any = [];
  colorScheme = 'cool';
  totalMedals: number = 0
  totalAthlete: number = 0
  numberEntries: number = 0

  constructor(private route: ActivatedRoute, private OlympicService: OlympicService) {
  }

  ngOnInit(): void {
    const countryName: string|null = this.route.snapshot.paramMap.get('countryName');
    this.OlympicService.getOlympics().subscribe(data  => {
      if (data) {
        this.items = data;
        this.participationData = data.find((item: OlympicCountry) => item.country === countryName);

        this.lineChartData = this.participationData?.participations.map((country: Participation) => ({
          name: country.city,
          series: this.participationData?.participations.map((participation: Participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }));
      }
console.log(this.lineChartData)
      // this.numberEntries = this.items.participations.length;
      //
      // this.totalMedals = this.items.participations.reduce((total, participation) => {
      //   return total + participation.medalsCount;
      // }, 0);
      //
      // this.totalAthlete = this.items.participations.reduce((total, participation) => {
      //   return total + participation.athleteCount;
      // }, 0);
    });
  }
}
