import { Component, OnInit } from '@angular/core';
import {LeadService} from '../lead.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers;
  selectedCustomer;
  showDeleteCustomerDialog;
  showCustomerDialog;
  pagedetails;
  page = 0;
  isSearch = false;
  sortField ="id";
  direction=0;

customer;

  constructor( private leadService: LeadService) { }
  setCustomers(data){
   this.customers = data['content'];
        this.pagedetails = {};
        this.pagedetails.page = data['number'];
        this.pagedetails.last = data['last'];
        this.pagedetails.totalPages = data['totalPages'];
        this.pagedetails.totalElements = data['totalElements'];
        this.pagedetails.numberOfElements = data['numberOfElements'];
        this.pagedetails.first = data['first'];
        this.pagedetails.size = data['size'];
  }
  getCustomers(){
    this.leadService.getCustomers(this.page,this.sortField,this.direction).subscribe(
      (data) => { 
        this.setCustomers(data);
        console.log(this.customers);
      },
      err => console.error(err),
    );
  }

  setCategory(customer){
    this.selectedCustomer = customer;
  }

  ngOnInit() {
    this.pagedetails = {};
    this.pagedetails.totalPages=0;
    this.getCustomers();
    this.leadService.Customer_getAllPersons().subscribe(
      data => { this.customers = data;
      },
      err => console.error(err),
    );
  }

  onSelectPage(pageNumber){
    this.page = pageNumber;
      this.getCustomers();

    /*if(this.isSearch==true){
      this.leadService.search(this.searchText,this.page,this.sortField,this.direction);
      console.log("Search");
    }else {
      
      this.leadService.getCategorys(this.page,this.sortField,this.direction);
      console.log("all");
    }*/
    window.scroll(0,0)
  }


  setSortField(field){
    this.sortField=field;

    if(this.direction==1)
      this.direction=0
    else  
      this.direction=1
      this.getCustomers();

      console.log("Search Mode " + this.isSearch);  
    /*if(this.isSearch==true){
      this.leadService.search(this.searchText,this.page,this.sortField,this.direction);
      console.log("Search");
    }else {
      this.leadService.getCategorys(this.page,this.sortField,this.direction);
      console.log("all");
    }*/
  }

  addCustomer(){
    this.selectedCustomer = {};
    this.selectedCustomer.customer = {};

    this.showCustomerDialog = true;
  }

  editCustomer(customer){
    this.selectedCustomer = customer;
    if(this.selectedCustomer.customer==undefined)
      this.selectedCustomer.customer={};
    this.showCustomerDialog = true;
  }

  saveCustomer(){
    if(this.selectedCustomer.customer.id ==undefined){
      this.selectedCustomer.customer = null;
    }
    this.leadService.saveCustomer(this.selectedCustomer).subscribe(
      data => { this.selectedCustomer = data;
        this.showCustomerDialog = false;
        this.getCustomers();
      },
      err => console.error(err),
    );
  }

  loadDeleteCustomer(customer){
    this.selectedCustomer = customer;
    this.showDeleteCustomerDialog = true;
  }


  deleteCustomer(){
    this.leadService.deleteCustomer(this.selectedCustomer).subscribe(
      data => { 
        this.showDeleteCustomerDialog = false;
        this.getCustomers();
      },
      err => console.error(err),
    );
  }



}