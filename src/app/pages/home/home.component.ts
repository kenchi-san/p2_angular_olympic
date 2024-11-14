import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from 'src/app/core/models/Olympic';
import {Participation} from "../../core/models/Participation";
import {Router} from "@angular/router";
import {PieChart} from "../../core/models/PieChart";
import {ResizeChartService} from "../../core/services/resize-chart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: OlympicCountry[] = [];
  totalCountries: number = 0;
  totalNumberJos: number = 0;
  pieChartData: PieChart[] = [];
  chartWidth: number = 0;
  chartHeight: number = 0;
  colorScheme: string = 'cool'

  constructor(private OlympicService: OlympicService, private router: Router,private resizeChartService: ResizeChartService) {
  }

  onSelect(data: PieChart): void {
    const selectedCountry:OlympicCountry|undefined = this.items.find(item => item.country === data.name);
    if (selectedCountry) {
      this.router.navigate(['/country-details', selectedCountry.country]);
    }
  }

  ngOnInit(): void {

    this.resizeChartService.setChartType('pieChart');
    this.resizeChartService.chartDimensions$.subscribe(dimensions => {
      this.chartWidth = dimensions.width;
      this.chartHeight = dimensions.height;
    });

    this.OlympicService.getOlympics().subscribe(data => {
      if (data) {
        this.items = data;

        this.pieChartData = data.map((item: OlympicCountry): PieChart => ({
          name: item.country,
          value: item.participations.reduce(
            (sum: number, p: Participation): number => sum + p.medalsCount,
            0
          ),
        }))
        this.totalCountries = this.items.length;

        this.totalNumberJos = new Set(
          this.items.flatMap((item: OlympicCountry) =>
            item.participations.map((d: Participation) => d.year.toString())
          )
        ).size;
      }
    });
  }
}
