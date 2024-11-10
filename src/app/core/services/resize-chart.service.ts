import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeChartService {
  private chartDimensionsSubject = new BehaviorSubject<{
    width: number,
    height: number,
    typeOfChart: string;
  }>({width: 700, height: 400, typeOfChart: ''});
  chartDimensions$ = this.chartDimensionsSubject.asObservable();

  constructor() {
    this.updateChartDimensions();
    window.addEventListener('resize', () => this.updateChartDimensions());
  }

  // Met à jour les dimensions du graphique en fonction du type
  private updateChartDimensions(typeOfChart: string = ''): void {
    const screenWidth = window.innerWidth;
    let width: number;
    let height: number;

    if (typeOfChart === 'lineChart') {
      width = screenWidth < 600 ? screenWidth - 20 : screenWidth < 900 ? screenWidth - 40 : 700;
      height = screenWidth < 600 ? 300 : screenWidth < 900 ? 350 : 400;
    } else if (typeOfChart === 'pieChart') {
      width = screenWidth < 600 ? screenWidth - 20 : screenWidth < 900 ? screenWidth - 40 : 700;
      height = screenWidth < 600 ? 300 : screenWidth < 900 ? 700 : 700;
    } else {
      // Défaut pour les autres types ou au démarrage
      width = screenWidth < 600 ? screenWidth - 20 : screenWidth < 900 ? screenWidth - 40 : 700;
      height = screenWidth < 600 ? 300 : screenWidth < 900 ? 350 : 400;
    }

    this.chartDimensionsSubject.next({ width, height, typeOfChart });
  }

  // Méthode publique pour déclencher manuellement une mise à jour
  public setChartType(typeOfChart: string): void {
    this.updateChartDimensions(typeOfChart);
  }
}
