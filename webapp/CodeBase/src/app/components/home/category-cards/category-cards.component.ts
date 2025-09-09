import { Component } from '@angular/core';
import { Product } from '../../../Interface/Products';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category-cards',
  standalone: false,
  templateUrl: './category-cards.component.html',
  styleUrl: './category-cards.component.css'
})
export class CategoryCardsComponent {
  Products!: Observable<Product[]>;
  constructor(private _productsservice: ProductsService) { }

  ngOnInit() {
    this.Products = this._productsservice.getCategories();
  }
}
