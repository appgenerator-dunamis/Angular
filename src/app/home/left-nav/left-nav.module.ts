import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [ MenuComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  exports:[
    MenuComponent
  ]
})
export class LeftNavModule { }