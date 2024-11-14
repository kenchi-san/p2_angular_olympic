import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {ResizeChartService} from 'src/app/core/services/resize-chart.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  participationData: OlympicCountry | null = null;
  items: OlympicCountry[] = [];
  lineChartData: { name: string; series: { name: string; value: number; }[] | undefined; }[] | undefined
  colorScheme: string = 'cool';
  totalMedals: number | undefined = 0
  totalAthlete: number | undefined = 0
  numberEntries: number | undefined = 0
  chartWidth: number = 0;
  chartHeight: number = 0;

  constructor(private route: ActivatedRoute,
              private OlympicService: OlympicService,
              private resizeChartService: ResizeChartService,
              private location: Location,
              private router: Router,) {
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {


    this.resizeChartService.setChartType('lineChart');
    this.resizeChartService.chartDimensions$.subscribe(dimensions => {
      this.chartWidth = dimensions.width;
      this.chartHeight = dimensions.height;
    });

    const countryName: string | null = this.route.snapshot.paramMap.get('countryName');

    // TODO ligne seul par country

    this.OlympicService.getOlympics().subscribe(data => {
      if (data && countryName) {
        this.items = data;
        this.participationData = data.find((item: OlympicCountry): boolean => item.country === countryName);

        this.lineChartData = this.participationData?.participations.map((country: Participation) => ({
          name: country.city,
          series: this.participationData?.participations.map((participation: Participation): {
            name: string,
            value: number
          } => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }));
      } else {
        this.router.navigate(['/']);
      }
    });

// TODO multiple ligne
    // this.OlympicService.getOlympics().subscribe(data => {
    //   if (data) {
    //     this.items = data;
    //     this.participationData = data.find((item: OlympicCountry): boolean => item.country === countryName);
    //     this.lineChartData = data.map((country: OlympicCountry) => ({
    //       name: country.country,
    //       series: country.participations.map((participation: Participation) => ({
    //         name: participation.year.toString(),
    //         value: participation.medalsCount
    //       }))
    //     }));
    //   }

    this.numberEntries = this.participationData?.participations.length;

    this.totalMedals = this.participationData?.participations.reduce((sum: number, p: Participation): number => sum + p.medalsCount,
      0)
    this.totalAthlete = this.participationData?.participations.reduce((sum: number, p: Participation): number => sum + p.athleteCount,
      0)

  }
}
