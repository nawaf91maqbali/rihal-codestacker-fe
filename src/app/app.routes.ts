import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

//routes compontent 
//used to register all routes in app
export const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent 
  },
];
