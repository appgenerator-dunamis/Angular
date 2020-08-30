import { Component, OnInit } from '@angular/core';
import {LeadService} from '../lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  leads;
  selectedLead;
  showDeleteLeadDialog;
  showLeadDialog;
  pagedetails;
  page = 0;
  isSearch = false;
  sortField ="id";
  direction=0;

  products;
product;customers;
customer;organizations;
organization;

  constructor( private leadService: LeadService) { }
  setLeads(data){
   this.leads = data['content'];
        this.pagedetails = {};
        this.pagedetails.page = data['number'];
        this.pagedetails.last = data['last'];
        this.pagedetails.totalPages = data['totalPages'];
        this.pagedetails.totalElements = data['totalElements'];
        this.pagedetails.numberOfElements = data['numberOfElements'];
        this.pagedetails.first = data['first'];
        this.pagedetails.size = data['size'];
  }
  getLeads(){
    this.leadService.getLeads(this.page,this.sortField,this.direction).subscribe(
      (data) => { 
        this.setLeads(data);
        console.log(this.leads);
      },
      err => console.error(err),
    );
  }

  setCategory(lead){
    this.selectedLead = lead;
  }

  ngOnInit() {
    this.pagedetails = {};
    this.pagedetails.totalPages=0;
    this.getLeads();
    this.leadService.Lead_getAllProducts().subscribe(
      data => { this.products = data;
      },
      err => console.error(err),
    );this.leadService.Lead_getAllCustomers().subscribe(
      data => { this.customers = data;
      },
      err => console.error(err),
    );this.leadService.Lead_getAllOrganizations().subscribe(
      data => { this.organizations = data;
      },
      err => console.error(err),
    );
  }

  onSelectPage(pageNumber){
    this.page = pageNumber;
      this.getLeads();

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
      this.getLeads();

      console.log("Search Mode " + this.isSearch);  
    /*if(this.isSearch==true){
      this.leadService.search(this.searchText,this.page,this.sortField,this.direction);
      console.log("Search");
    }else {
      this.leadService.getCategorys(this.page,this.sortField,this.direction);
      console.log("all");
    }*/
  }

  addLead(){
    this.selectedLead = {};
    this.selectedLead.product = {};this.selectedLead.customer = {};this.selectedLead.organization = {};

    this.showLeadDialog = true;
  }

  editLead(lead){
    this.selectedLead = lead;
    if(this.selectedLead.product==undefined)
      this.selectedLead.product={};if(this.selectedLead.customer==undefined)
      this.selectedLead.customer={};if(this.selectedLead.organization==undefined)
      this.selectedLead.organization={};
    this.showLeadDialog = true;
  }

  saveLead(){
    if(this.selectedLead.product.id ==undefined){
      this.selectedLead.product = null;
    }if(this.selectedLead.customer.id ==undefined){
      this.selectedLead.customer = null;
    }if(this.selectedLead.organization.id ==undefined){
      this.selectedLead.organization = null;
    }
    this.leadService.saveLead(this.selectedLead).subscribe(
      data => { this.selectedLead = data;
        this.showLeadDialog = false;
        this.getLeads();
      },
      err => console.error(err),
    );
  }

  loadDeleteLead(lead){
    this.selectedLead = lead;
    this.showDeleteLeadDialog = true;
  }


  deleteLead(){
    this.leadService.deleteLead(this.selectedLead).subscribe(
      data => { 
        this.showDeleteLeadDialog = false;
        this.getLeads();
      },
      err => console.error(err),
    );
  }



}