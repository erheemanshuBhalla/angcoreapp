import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  itemId: number | null = null;
  ProductDetail: any; // Replace with actual data type
  selectedValue: string = 'Black';
  constructor(private route: ActivatedRoute, private _productsservice: ProductsService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from route
    this.fetchItemDetails(); // Fetch data based on ID
  }

  // product-list.component.ts
  addToCart(product: any, quantity: string): void {
    alert(quantity);
    alert(this.selectedValue);
    let cartItems: any[] = [];
    const existingCart = this.cookieService.get('shoppingCart');

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // Add or update the product in the cartItems array
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity++;
      if (cartItems[existingItemIndex].color != this.selectedValue) {
        if (this.selectedValue != undefined) {
          cartItems[existingItemIndex].color = cartItems[existingItemIndex].color + ", " + this.selectedValue;
        }
      }
    } else {
      cartItems.push({ ...product, quantity: quantity, color: this.selectedValue });
    }
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Cookie will expire in 7 days

    this.cookieService.set('shoppingCart', JSON.stringify(cartItems), expiryDate);
    console.log("items pushed to cart");

    // Optionally, you can set an expiry for the cookie
    // this.cookieService.set('shoppingCart', JSON.stringify(cartItems), expirationDays);
  }
  fetchItemDetails(): void {

    this._productsservice.getProductDetails(this.itemId).subscribe((ProductDetail: any) => { this.ProductDetail = ProductDetail; console.log(ProductDetail); });
    
  }
}
