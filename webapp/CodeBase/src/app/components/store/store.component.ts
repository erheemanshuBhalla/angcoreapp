
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Products';
import { Observable } from 'rxjs';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-store',
  standalone: false,
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  userDetails: any;
  areAllSelected = false;
  areAllSizesSelected = false;
  productForm!: FormGroup;
  dropdownData: any[] = [];
  keyword = 'name';
  public categories: any[] = [];
  Products!: Observable<Product[]>;
  options: Options = { floor: 0, ceil: 10000, showOuterSelectionBars: true };
  minValue: number = 0;
  maxValue: number = 1000;
  AmberMin: number = 41;
  AmberMax: number = this.maxValue;
  GreenMin: number = this.maxValue + 1;
  items = [{ name: 'Red', selected: false, id: 1 }, { name: 'Green', selected: false, id: 2 }, { name: 'Yellow', selected: false, id: 3 }];
  itemsSizes = [{ name: 'Big', selected: false, id: 1 }, { name: 'Large', selected: false, id: 2 }, { name: 'Small', selected: false, id: 3 }];
  categoryId!: number;
  selected_sizes!: any;
  selected_colors!: any;
  constructor(private fb: FormBuilder, private router: Router,
    private service: UserService, private _productsservice: ProductsService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
    this._productsservice.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.dropdownData);
    });
    this.setForm();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("selected-"); console.log(search);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  minValueChange(event: any): void {
    // console.log(event);
    //this.RedMax = event;
    //this.AmberMin = event + 1;
  }
  maxValueChange(event: any): void {
    //console.log(event);
    //if (event)
    //this.GreenMin = event + 1;
    //this.GreenMax = event + 1;
  }

  toggleAllSizesSelection() {
    this.areAllSizesSelected = !this.areAllSelected;
    this.itemsSizes = this.itemsSizes.map(item => ({ ...item, selected: this.areAllSizesSelected }));
  }
  toggleAllSelection() {
    this.areAllSelected = !this.areAllSelected;
    this.items = this.items.map(item => ({ ...item, selected: this.areAllSelected }));
  }


  selectEvent(item: any) {
    // do something with selected item
    console.log("selected-");
    console.log(item);
    console.log(item.id);
    this.categoryId = item.id;
    this.FilterResults();
    // this.Products = this._productsservice.getProducts(item.id);
  }
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.getChangeContextString(changeContext);
    this.FilterResults();
  }
  get sizeArray() {
    return this.productForm.get('size') as FormArray;
  }
  get colorArray() {
    return this.productForm.get('color') as FormArray;
  }
  ChangeSize(event: any): void {
    //const isChecked = event.target.checked;
    //console.log('Checkbox is checked:', isChecked);
    // Perform actions based on checkbox state
    /* Get checkbox Sizes selected values */
    console.log(this.productForm.value.size);
    console.log(event);
    const selectedValuessizes = this.productForm.value.size
      .map((checked: boolean, index: number) => checked ? this.itemsSizes[index] : null)
      .filter((value: string | null) => value !== null);
    const sizes = selectedValuessizes.map((user: { name: string; }) => user.name);

    console.log(sizes);
    this.selected_sizes = sizes;
    this.FilterResults();
    /* End checkbox colors */
  }
  ChangeColor(event: any): void {
    //const isChecked = event.target.checked;
    //console.log('Checkbox is checked:', isChecked);
    // Perform actions based on checkbox state
    /* Get checkbox colors selected values */

    const selectedValues = this.productForm.value.color
      .map((checked: boolean, index: number) => checked ? this.items[index] : null)
      .filter((value: string | null) => value !== null);
    const colors = selectedValues.map((user: { name: string; }) => user.name);
    console.log(colors);
    this.selected_colors = colors;
    this.FilterResults();
    /* End checkbox colors */


  }
  FilterResults() {
    console.log(this.selected_colors);
    console.log(this.selected_sizes);
    console.log(this.categoryId);
    console.log(this.AmberMax);
    console.log(this.GreenMin);
    this.Products = this._productsservice.getProducts(this.categoryId, this.GreenMin, this.AmberMax, this.selected_colors, this.selected_sizes)

  }
  onSubmit() {
    debugger;
    console.log(this.productForm.valid);
  }
  getChangeContextString(changeContext: ChangeContext): void {
    /* return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
       `value: ${changeContext.value}, ` +
       `highValue: ${changeContext.highValue}}`;**/
    //return changeContext.value + ',' + changeContext.highValue;
    this.AmberMax = changeContext.value;
    this.GreenMin = changeContext.highValue as number;
    console.log(this.AmberMax);
    console.log(this.GreenMin);
  }
  public setForm() {
    this.productForm = this.fb.group({
      myAutocompleteControl: new FormControl(''),
      price: new FormControl(''),
      color: this.fb.array(this.items.map(() => new FormControl(false))),
      size: this.fb.array(this.itemsSizes.map(() => new FormControl(false))),
    });
    //this.loadContent = true;
  }
  onFocused(e: any) {
    // do something
  }
  onUserChangeStart(changeContext: ChangeContext): void {
    //this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    //const price_range: string = `onUserChange(${this.getChangeContextString(changeContext)})`;
    //console.log(price_range);
  }


}
