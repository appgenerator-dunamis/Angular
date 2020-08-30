import { Injectable } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private dataService:DataProviderService) { }

  getProducts(page,sortField,direction){
  return this.dataService.getData(`Product/Page/${page}/Sort/${sortField}/Direction/${direction}`);
}



saveProduct(product){
  return this.dataService.postData(`Product`,product);
}

public deleteProduct(product){
  return this.dataService.getData(`Product/Delete/${product.id}`)
}getLeads(page,sortField,direction){
  return this.dataService.getData(`Lead/Page/${page}/Sort/${sortField}/Direction/${direction}`);
}

public Lead_getAllProducts(){
    return this.dataService.getData(`Product`);
  }public Lead_getAllCustomers(){
    return this.dataService.getData(`Customer`);
  }public Lead_getAllOrganizations(){
    return this.dataService.getData(`Organization`);
  }

saveLead(lead){
  return this.dataService.postData(`Lead`,lead);
}

public deleteLead(lead){
  return this.dataService.getData(`Lead/Delete/${lead.id}`)
}getCustomers(page,sortField,direction){
  return this.dataService.getData(`Customer/Page/${page}/Sort/${sortField}/Direction/${direction}`);
}

public Customer_getAllPersons(){
    return this.dataService.getData(`Person`);
  }

saveCustomer(customer){
  return this.dataService.postData(`Customer`,customer);
}

public deleteCustomer(customer){
  return this.dataService.getData(`Customer/Delete/${customer.id}`)
}getOrganizations(page,sortField,direction){
  return this.dataService.getData(`Organization/Page/${page}/Sort/${sortField}/Direction/${direction}`);
}



saveOrganization(organization){
  return this.dataService.postData(`Organization`,organization);
}

public deleteOrganization(organization){
  return this.dataService.getData(`Organization/Delete/${organization.id}`)
}

}