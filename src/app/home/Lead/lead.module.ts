import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerModule } from '../../pager/pager.module';
import { ClrIconModule } from '@clr/angular';
import { ClarityModule } from '@clr/angular';
import { LeadRoutingModule } from './lead-routing.module';
import { TabsComponent } from './tabs.component';
import { FormsModule } from '@angular/forms';

import { ProductComponent } from './product/product.component';import { LeadComponent } from './lead/lead.component';import { CustomerComponent } from './customer/customer.component';import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  declarations: [
     TabsComponent,
      ProductComponent,LeadComponent,CustomerComponent,OrganizationComponent,
  ],
  imports: [
    LeadRoutingModule,
    CommonModule,
    PagerModule,
    ClrIconModule,
    ClarityModule,
    FormsModule
  ]
})
export class LeadModule  { }