import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }
  selectedPage
  ngOnInit() {
  }


  selectPage(page){
    this.selectedPage=page;
    switch(page){
      case 1:
          this.router.navigate(['/home/dashboard']);
          break;  
      case 2:
          this.router.navigate(['/home/lead']);
          break;     
     
    }
    
  }

}