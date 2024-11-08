import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from 'src/app/core/models/Olympic';
import {Participation} from "../../core/models/Participation";
import {Router} from "@angular/router";
import {PieChart} from "../../core/models/PieChart";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: OlympicCountry[] = [];
  totalCountries: number = 0;
  pieChartData: PieChart[] = [];

  colorScheme: string = 'cool'

  constructor(private OlympicService: OlympicService, private router: Router) {
  }

  onSelect(data:PieChart): void {
    const selectedCountry = this.items.find(item => item.country === data.name);
    if (selectedCountry) {
      this.router.navigate(['/country-details', selectedCountry.country]);
    }
  }

  ngOnInit(): void {
    this.OlympicService.getOlympics().subscribe(data => {
      if (data) {
        this.items = data;

        this.pieChartData = data.map((item :OlympicCountry) => ({
          name: item.country,
          value: item.participations.reduce(
            (sum: number, p: Participation):number => sum + p.medalsCount,
            0
          ),
        }))
        this.totalCountries = this.items.length;
      }
    });
  }
}
