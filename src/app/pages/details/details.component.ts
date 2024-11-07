import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  countryData:  Participation| undefined;

  constructor(private route: ActivatedRoute, private OlympicService: OlympicService) {}

  ngOnInit(): void {
    const countryName: string|null = this.route.snapshot.paramMap.get('countryName');
    this.OlympicService.getOlympics().subscribe(data  => {
      this.countryData = data.find((item: OlympicCountry)=> item.country === countryName);
      console.log(data);
    });
  }
}
