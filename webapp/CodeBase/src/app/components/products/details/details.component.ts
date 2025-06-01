import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  itemId: number | null = null;
  ProductDetail: any; // Replace with actual data type

  constructor(private route: ActivatedRoute, private _productsservice: ProductsService) { }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from route
    this.fetchItemDetails(); // Fetch data based on ID
  }

  fetchItemDetails(): void {

    this._productsservice.getProductDetails(this.itemId).subscribe((ProductDetail: any) => this.ProductDetail = ProductDetail);
  }
}
