import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  constructor(private _productsservice: ProductsService) { }
  Products: any[] = [];
  ngOnInit() {
    
    this._productsservice.getProducts().subscribe(data => {


      this.Products = data;
      //console.log(this.dropdownData);
    });
  }

 
}
