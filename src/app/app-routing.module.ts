import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  {   path: '',   component: LoginComponent
  },
  {   path: 'home',   component: HomeComponent,
  
    children:[
      {   path: 'dashboard',   component: DashboardComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }