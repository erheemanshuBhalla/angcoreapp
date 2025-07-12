import { Component } from '@angular/core';
import { Product } from '../../../Products';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-best-seller',
  standalone: false,
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css'
})
export class BestSellerComponent {
  Products!: Observable<Product[]>;
  constructor(private _productsservice: ProductsService) { }

  ngOnInit() {
    this.Products = this._productsservice.get_Products_component("BestSelling");
  }
}
