import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
// Child Components
import { ListComponent } from './components/chart/list/list.component';
import { CreateComponent } from './components/chart/create/create.component';


const APP_ROUTES: Routes = [
  { path: 'charts',
    component : ChartComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'list'}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'charts'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
