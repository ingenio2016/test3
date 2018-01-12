import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ChartComponent } from './components/chart/chart.component';

// Routes import
import { APP_ROUTING } from './app.routes';
import { ListComponent } from './components/chart/list/list.component';
import { CreateComponent } from './components/chart/create/create.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

// Chart Provider
import { ChartService } from './providers/chart.service'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChartComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
