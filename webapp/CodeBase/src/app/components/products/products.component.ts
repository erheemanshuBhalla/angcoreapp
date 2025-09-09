import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

import { AsyncPipe, DecimalPipe } from '@angular/common';
//import { Component, QueryList, ViewChildren } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../../Interface/Products';
import { PRODUCTDATA } from '../../Data/ProductData';
import { NgbdSortableHeader, SortEvent } from '../../directives/table-sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterLink } from '@angular/router';


@Component({
  selector: 'app-products', 

  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, RouterModule],
  providers: [ProductsService, DecimalPipe]


})

export class ProductsComponent implements OnInit {
  
  constructor(public _productsservice: ProductsService) {
    /*this._productsservice.getProducts().subscribe(data => {
      this.Products = data;
    });*/
    this.Products = this._productsservice.countries$;





    this.total = this._productsservice.total$;
  }
  Products: Observable<Product[]>;
  //Products: any[] = [];
  total!: Observable<number>;
  @ViewChildren(NgbdSortableHeader)
    headers!: QueryList<NgbdSortableHeader>;

  ngOnInit() {
   // this.Products=
    
     
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this._productsservice.sortColumn = column;
    this._productsservice.sortDirection = direction;
  }
}

//function ViewChildren(NgbdSortableHeader: typeof NgbdSortableHeader): (target: ProductsComponent, propertyKey: "headers") => void {
//    throw new Error('Function not implemented.');
//}
