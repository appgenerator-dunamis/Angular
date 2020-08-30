import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() pager;
  @Output() selectPage: EventEmitter<any> = new EventEmitter();
  selectedPage;
  allPages=[];
  pages=[];
  pageSizeAdder =3;


  constructor() { }
  

  ngOnInit() {
    for (let i = 0; i < this.pager.totalPages; i++) {
      this.allPages.push(i+1);
    }
    this.setPage(1);
  }
  
  setPage(page: number) {
  this.pages=[];

   this.selectedPage = page; 
   this.selectPage.emit(page-1);
   let startIndex
   let endIndex

   if(this.selectedPage-this.pageSizeAdder<0)
    startIndex= 0
   else 
    startIndex = this.selectedPage-this.pageSizeAdder
   
   if(this.selectedPage +this.pageSizeAdder>this.pager.totalPages)
      endIndex = this.pager.totalPages
   else   
      endIndex = this.selectedPage +this.pageSizeAdder
   
      
  for (let i = startIndex; i < endIndex; i++) {
      this.pages.push(i+1);
    }   

    console.log(this.pages)
  }

  
}