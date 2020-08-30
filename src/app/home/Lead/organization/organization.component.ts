import { Component, OnInit } from '@angular/core';
import {LeadService} from '../lead.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations;
  selectedOrganization;
  showDeleteOrganizationDialog;
  showOrganizationDialog;
  pagedetails;
  page = 0;
  isSearch = false;
  sortField ="id";
  direction=0;

  

  constructor( private leadService: LeadService) { }
  setOrganizations(data){
   this.organizations = data['content'];
        this.pagedetails = {};
        this.pagedetails.page = data['number'];
        this.pagedetails.last = data['last'];
        this.pagedetails.totalPages = data['totalPages'];
        this.pagedetails.totalElements = data['totalElements'];
        this.pagedetails.numberOfElements = data['numberOfElements'];
        this.pagedetails.first = data['first'];
        this.pagedetails.size = data['size'];
  }
  getOrganizations(){
    this.leadService.getOrganizations(this.page,this.sortField,this.direction).subscribe(
      (data) => { 
        this.setOrganizations(data);
        console.log(this.organizations);
      },
      err => console.error(err),
    );
  }

  setCategory(organization){
    this.selectedOrganization = organization;
  }

  ngOnInit() {
    this.pagedetails = {};
    this.pagedetails.totalPages=0;
    this.getOrganizations();
    
  }

  onSelectPage(pageNumber){
    this.page = pageNumber;
      this.getOrganizations();

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
      this.getOrganizations();

      console.log("Search Mode " + this.isSearch);  
    /*if(this.isSearch==true){
      this.leadService.search(this.searchText,this.page,this.sortField,this.direction);
      console.log("Search");
    }else {
      this.leadService.getCategorys(this.page,this.sortField,this.direction);
      console.log("all");
    }*/
  }

  addOrganization(){
    this.selectedOrganization = {};
    

    this.showOrganizationDialog = true;
  }

  editOrganization(organization){
    this.selectedOrganization = organization;
    
    this.showOrganizationDialog = true;
  }

  saveOrganization(){
    
    this.leadService.saveOrganization(this.selectedOrganization).subscribe(
      data => { this.selectedOrganization = data;
        this.showOrganizationDialog = false;
        this.getOrganizations();
      },
      err => console.error(err),
    );
  }

  loadDeleteOrganization(organization){
    this.selectedOrganization = organization;
    this.showDeleteOrganizationDialog = true;
  }


  deleteOrganization(){
    this.leadService.deleteOrganization(this.selectedOrganization).subscribe(
      data => { 
        this.showDeleteOrganizationDialog = false;
        this.getOrganizations();
      },
      err => console.error(err),
    );
  }



}