import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeChartService {
  private chartDimensionsSubject = new BehaviorSubject<{ width: number, height: number }>({ width: 700, height: 400 });
  chartDimensions$ = this.chartDimensionsSubject.asObservable();

  constructor() {
    this.updateChartDimensions();
    window.addEventListener('resize', this.updateChartDimensions.bind(this));
  }

  private updateChartDimensions(): void {
    const screenWidth = window.innerWidth;
    const width = screenWidth < 600 ? screenWidth - 20 :
      screenWidth < 900 ? screenWidth - 40 : 700;
    const height = screenWidth < 600 ? 300 :
      screenWidth < 900 ? 350 : 400;

    this.chartDimensionsSubject.next({ width, height });
  }
}
