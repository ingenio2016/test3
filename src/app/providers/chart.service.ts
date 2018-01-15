import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Chart } from '../interfaces/chart.interface';

@Injectable()
export class ChartService {
  // chart Collections
  chartCollection: AngularFirestoreCollection<any>;
  chartObs: Observable<any>;
  chartId = '';


  private charts: any[] = [];

  constructor(private db: AngularFirestore) {
    // initialize chart coleections
    this.chartCollection = this.db
      .collection<any>('chart');
    this.chartObs = this.chartCollection.valueChanges();
    google.charts.load('current', {'packages': ['corechart']});
  }

  loadCharts() {
    return this.chartObs
      .map((charts: any[]) => {
        this.charts = [];
        for (const chart of charts){
          this.charts.unshift(chart);
        }
        return this.charts;
      });
  }

  saveChart( forma: any ): Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      this.chartId = '';
      this.chartCollection.add( forma )
        .then((chart) => {
          this.chartCollection.doc(chart.id).update({
            id: chart.id
          }).then((data) => {
            resolve(chart.id);
          });
        }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  updateChart( forma: any ): Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      this.chartCollection.doc(forma.id).update({
        name: forma.name,
        categories: forma.categories
      }).then((data) => {
        resolve({data: data});
      });
    });
    return promise;
  }

  getChart(id: string) {
    for (const chart of this.charts) {
      if ( chart.id === id ) {
        return chart;
      }
    }
  }

  obtainChart( chart: any ) {
    google.charts.setOnLoadCallback(this.drawPieChart(chart));
    google.charts.setOnLoadCallback(this.drawBarChart(chart));
  }

  drawPieChart( chartData: any ) {
    // Create the data table.
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    for ( const category of chartData.categories ) {
     data.addRows([[category.name, category.value]]);
    }

    // Set chart options
    const options = {
      'width': 500,
      'height': 400
    };

    // Pie Chart
    const pieChart = new google.visualization.PieChart( document.getElementById('chart_pie' ));
    pieChart.draw(data, options);
  }

  drawBarChart( chartData: any ) {
    // Create the data table.
    const data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for ( const category of chartData.categories ) {
      data.addRows([[category.name, category.value]]);
    }

    // Set chart options
    const options = {
      'width': 600,
      'height': 400
    };

    // Bar Chart
    const barChart = new google.visualization.BarChart( document.getElementById('chart_bar' ));
    barChart.draw(data, options);
  }
}

