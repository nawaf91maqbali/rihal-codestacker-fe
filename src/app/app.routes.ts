import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

//routes compontent 
//used to register all routes in app
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
