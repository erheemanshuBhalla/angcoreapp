import { AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements AfterContentInit {
  @ContentChild('paragraphspecial') projectedParagraph!: ElementRef;
  ngAfterContentInit(): void {
    if (this.projectedParagraph) {
      console.log('Projected paragraph:', this.projectedParagraph.nativeElement.textContent);
      this.projectedParagraph.nativeElement.style.color = 'blue';
    }

  }
}
