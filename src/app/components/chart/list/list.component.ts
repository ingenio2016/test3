import { Component, OnInit } from '@angular/core';
import { ChartSelectEvent } from 'ng2-google-charts';
import { ChartService} from '../../../providers/chart.service';
import { ViewChild } from '@angular/core';
import { Chart } from '../../../interfaces/chart.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private chart: Chart;
  private charts: Chart[] = [];
  public columnChartData: any = {};
  public pieChartData: any = {};
  constructor(private _chartService: ChartService) {
    this._chartService.loadCharts().subscribe((data) => {
      this.charts = data;
      // this.getChart(this.charts[0].id);
      this.drawChart(this.charts[0]);
    });
  }

  @ViewChild('cchart') cchart;

  public selectEvent: ChartSelectEvent;

  ngOnInit() {
  }

  getChart(id: string) {
    console.log(id);
    this.chart = this._chartService.getChart(id);
    this.drawChart(this.chart);
  }

  drawChart(chart: any) {
    const dataTable = [];
    dataTable.push(['Category', 'Value']);

    chart.categories.forEach(function (category) {
      dataTable.push([category.name, category.value]);
    });

    this.columnChartData = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options: {
        title: chart.name,
        'width': 600,
        'height': 400
      }
    };

    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: chart.name,
        'width': 500,
        'height': 400
        }
      };
    }
}
