import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../../../Products';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  Products!: Observable<Product[]>;
  constructor(private _productsservice: ProductsService) { }

  ngOnInit() {
    this.Products = this._productsservice.get_Products_component("Featured");
  }
}
