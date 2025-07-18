
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../Products';
import { Observable } from 'rxjs';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
   
  @ViewChild('Categoriesheading') Categoriesheading!: ElementRef;
  @ViewChild('BestSellingHeading') BestSellingHeading!: ElementRef;
  @ViewChild('OnsaleHeading') OnsaleHeading!: ElementRef;
  @ViewChild('FeaturedHeading') FeaturedHeading!: ElementRef;
  @ViewChildren('subheadinghome') subheadinghome!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    if (this.Categoriesheading) {
      this.Categoriesheading.nativeElement.textContent = 'Store Categories';
    }
    if (this.BestSellingHeading) {
      this.BestSellingHeading.nativeElement.textContent = 'Best Selling Products';
    }
    if (this.OnsaleHeading) {
      this.OnsaleHeading.nativeElement.textContent = 'Products On Sale';
    }
    if (this.FeaturedHeading) {
      this.FeaturedHeading.nativeElement.textContent = 'Featured Products';
    }

    this.subheadinghome.forEach((elementRef: ElementRef) => {
      this.renderer.setStyle(elementRef.nativeElement, 'color', 'blue');
      this.renderer.setStyle(elementRef.nativeElement, 'font-size', '20px');
    });

  }
}
