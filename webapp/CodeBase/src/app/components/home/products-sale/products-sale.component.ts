import { Component, Input } from '@angular/core';
import { Product } from '../../../Products';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-sale',
  standalone: false,
  templateUrl: './products-sale.component.html',
  styleUrl: './products-sale.component.css'
})
export class ProductsSaleComponent {
  Products!: Observable<Product[]>;
  //Input Decorator
  @Input() type = "";
  constructor(private _productsservice: ProductsService) { }

  ngOnInit() {
    this.Products = this._productsservice.get_Products_component(this.type);
  }
}
