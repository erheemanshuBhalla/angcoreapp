import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  cartItems: any[] = [];  
  totalPrice: number = 0;
  tax: number = 180;
  promoprice: number = 5;
  constructor(private fb: FormBuilder,private cookieService: CookieService) { }
  ngOnInit(): void {
    debugger;
    const existingCart = this.cookieService.get('shoppingCart');
    if (existingCart) {
      this.cartItems = JSON.parse(existingCart);
      console.log(this.cartItems);
    }
    this.calculateTotalPrice();
    this.setForm();
  }
 
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }
  public setForm() {
    this.checkoutForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      address: [''],
      country: [''],
      state: [''],
      zipcode: [''],
      paymentMethod:[''],
      CardDetails: this.fb.group({ // Nested FormGroup
        nameoncard: [''],
        cardnumber: [0],
        expiration: [''],
        cvv:['']
      })
    });
   

  }

  onSubmit() {
    debugger;
    console.log(this.checkoutForm.valid);
    if (this.checkoutForm.valid) {
      if (this.checkoutForm.valid ) {
       
        console.log(this.checkoutForm.value);

        /*this._productsservice.saveProduct(this.productForm.value).subscribe(
          response => {
            console.log('POST request successful', response);
          },
          error => {
            console.error('Error during POST request', error);
          }
        );;*/
        // Handle form submission
      }
    }
    else {
      console.log(this.checkoutForm.controls);
      const invalid = [];
      const controls = this.checkoutForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log(invalid);
    }
  }
}
