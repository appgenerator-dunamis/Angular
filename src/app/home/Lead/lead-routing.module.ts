import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
{   
  path: 'home', component:HomeComponent,  
    children:[
      {   path: 'lead',   component: TabsComponent,
      }, 
    ]
  },  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class LeadRoutingModule { }