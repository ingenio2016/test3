import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChartService {
  // chart Collections
  chartCollection: AngularFirestoreCollection<any>;
  chartObs: Observable<any>;
  chartId = '';

  // chart category collection
  chartCategoryCollection: AngularFirestoreCollection<any>;
  chatCategoryObs: Observable<any>;
  chatCategoryId = '';

  private charts: any[] = [];
  private isSearch = false;

  constructor(private db: AngularFirestore) {
    // initialize chart coleections
    this.chartCollection = this.db
      .collection<any>('chart');
    this.chartObs = this.chartCollection.valueChanges();

    // initialize chart category coleections
    this.chartCategoryCollection = this.db
      .collection<any>('chart-category');
    this.chatCategoryObs = this.chartCategoryCollection.valueChanges();
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
}
