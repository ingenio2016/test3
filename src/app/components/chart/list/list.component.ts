import { Component, OnInit } from '@angular/core';
import { ChartService} from '../../../providers/chart.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private chart: any[] = [];
  constructor( private _chartService: ChartService ) {
    this._chartService.loadCharts().subscribe( () => {
    });
  }

  ngOnInit() {
  }

  getChart(id: string) {
    console.log(id);
    this.chart = this._chartService.getChart(id);
    this._chartService.obtainChart( this.chart );
  }
}
