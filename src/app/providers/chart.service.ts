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
      .collection<any>('charts');
    this.chartObs = this.chartCollection.valueChanges();

    // initialize chart category coleections
    this.chartCategoryCollection = this.db
      .collection<any>('chart-category');
    this.chatCategoryObs = this.chartCategoryCollection.valueChanges();
  }

  changeSearchState() {
    this.isSearch = false;
  }
}
