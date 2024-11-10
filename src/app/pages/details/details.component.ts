import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import { ResizeChartService } from 'src/app/core/services/resize-chart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  participationData: OlympicCountry | null = null;
  items: any[] = [];
  lineChartData: { name: string; series: { name: string; value: number; }[] | undefined; }[] | undefined
  colorScheme: string = 'cool';
  totalMedals: number | undefined = 0
  totalAthlete: number | undefined = 0
  numberEntries: number = 0
  chartWidth: number = 700;
  chartHeight: number = 400;
  constructor(private route: ActivatedRoute, private OlympicService: OlympicService,private resizeChartService: ResizeChartService) {
  }

  ngOnInit(): void {


    this.resizeChartService.chartDimensions$.subscribe(dimensions => {
      this.chartWidth = dimensions.width;
      this.chartHeight = dimensions.height;
    });

    const countryName: string | null = this.route.snapshot.paramMap.get('countryName');

    // TODO ligne seul par country

    //     this.OlympicService.getOlympics().subscribe(data  => {
//       if (data) {
//         this.items = data;
//         this.participationData = data.find((item: OlympicCountry):boolean => item.country === countryName);
//
//         this.lineChartData = this.participationData?.participations.map((country: Participation) => ({
//           name: country.city,
//           series: this.participationData?.participations.map((participation: Participation):{name:string,value:number} => ({
//             name: participation.year.toString(),
//             value: participation.medalsCount
//           }))
//         }));
//       }
// console.log(this.lineChartData)
    // this.numberEntries = this.items.participations.length;
    //
    // this.totalMedals = this.items.participations.reduce((total, participation) => {
    //   return total + participation.medalsCount;
    // }, 0);
    //
    // this.totalAthlete = this.items.participations.reduce((total, participation) => {
    //   return total + participation.athleteCount;
    // }, 0);
    // });

// TODO multiple ligne

    this.OlympicService.getOlympics().subscribe(data => {
      if (data) {
        this.items = data;
        this.participationData = data.find((item: OlympicCountry): boolean => item.country === countryName);
        this.lineChartData = data.map((country: OlympicCountry) => ({
          name: country.country,
          series: country.participations.map((participation: Participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }));
      }

      this.numberEntries = this.items.length;

      this.totalMedals = this.participationData?.participations.reduce((sum: number, p: Participation): number => sum + p.medalsCount,
        0)
      this.totalAthlete = this.participationData?.participations.reduce((sum: number, p: Participation): number => sum + p.athleteCount,
        0)
    });
  }
}
