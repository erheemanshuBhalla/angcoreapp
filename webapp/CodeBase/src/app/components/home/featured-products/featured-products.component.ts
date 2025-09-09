import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../../../Interface/Products';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {
  Products!: Observable<Product[]>;
  //Input Decorator
  @Input() type = "";
  constructor(private _productsservice: ProductsService) { }

  ngOnInit() {
    this.Products = this._productsservice.get_Products_component(this.type);
  }
}
