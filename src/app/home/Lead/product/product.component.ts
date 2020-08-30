import { Component, OnInit } from '@angular/core';
import {LeadService} from '../lead.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products;
  selectedProduct;
  showDeleteProductDialog;
  showProductDialog;
  pagedetails;
  page = 0;
  isSearch = false;
  sortField ="id";
  direction=0;

  

  constructor( private leadService: LeadService) { }
  setProducts(data){
   this.products = data['content'];
        this.pagedetails = {};
        this.pagedetails.page = data['number'];
        this.pagedetails.last = data['last'];
        this.pagedetails.totalPages = data['totalPages'];
        this.pagedetails.totalElements = data['totalElements'];
        this.pagedetails.numberOfElements = data['numberOfElements'];
        this.pagedetails.first = data['first'];
        this.pagedetails.size = data['size'];
  }
  getProducts(){
    this.leadService.getProducts(this.page,this.sortField,this.direction).subscribe(
      (data) => { 
        this.setProducts(data);
        console.log(this.products);
      },
      err => console.error(err),
    );
  }

  setCategory(product){
    this.selectedProduct = product;
  }

  ngOnInit() {
    this.pagedetails = {};
    this.pagedetails.totalPages=0;
    this.getProducts();
    
  }

  onSelectPage(pageNumber){
    this.page = pageNumber;
      this.getProducts();

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
      this.getProducts();

      console.log("Search Mode " + this.isSearch);  
    /*if(this.isSearch==true){
      this.leadService.search(this.searchText,this.page,this.sortField,this.direction);
      console.log("Search");
    }else {
      this.leadService.getCategorys(this.page,this.sortField,this.direction);
      console.log("all");
    }*/
  }

  addProduct(){
    this.selectedProduct = {};
    

    this.showProductDialog = true;
  }

  editProduct(product){
    this.selectedProduct = product;
    
    this.showProductDialog = true;
  }

  saveProduct(){
    
    this.leadService.saveProduct(this.selectedProduct).subscribe(
      data => { this.selectedProduct = data;
        this.showProductDialog = false;
        this.getProducts();
      },
      err => console.error(err),
    );
  }

  loadDeleteProduct(product){
    this.selectedProduct = product;
    this.showDeleteProductDialog = true;
  }


  deleteProduct(){
    this.leadService.deleteProduct(this.selectedProduct).subscribe(
      data => { 
        this.showDeleteProductDialog = false;
        this.getProducts();
      },
      err => console.error(err),
    );
  }



}