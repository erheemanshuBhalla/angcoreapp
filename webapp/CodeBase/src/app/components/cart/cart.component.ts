import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent {

  cartItems: any[] = [];
  totalPrice: number = 0;
  tax: number = 180;
  constructor(private cookieService: CookieService) { }
  ngOnInit(): void {
    debugger;
    const existingCart = this.cookieService.get('shoppingCart');
    if (existingCart) {
      this.cartItems = JSON.parse(existingCart);
      console.log(this.cartItems);
    }
    this.calculateTotalPrice();
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }
  /* Remove from cart */
  removeItemFromCookie(itemId: number): void {
    const cookieData = this.cookieService.get('shopping_cart');
    let cartItems = cookieData ? JSON.parse(cookieData) : [];

    const updatedCartItems = cartItems.filter((item: { id: number; }) => item.id !== itemId);
    this.cookieService.set('shopping_cart', JSON.stringify(updatedCartItems));
  }
  /* Remove from cart */

  /* Updating Quanity in cart */
  updateItemQuantity(itemId: number, newQuantity: number): void {
    const cookieData = this.cookieService.get('shopping_cart');
    let cartItems = cookieData ? JSON.parse(cookieData) : [];

    const itemIndex = cartItems.findIndex((item: { id: number; }) => item.id === itemId);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity = newQuantity;
      this.cookieService.set('shopping_cart', JSON.stringify(cartItems));
    }
  }
  /* Updating Quanity in cart */

}
