import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import gsap from '../../../shared/gsap-lite';
import { Product } from '../../../user.products';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) product!: Product;
  @ViewChild('card', { static: true }) cardRef!: ElementRef<HTMLElement>;

  private readonly rotateAmount = 6;

  ngAfterViewInit(): void {
    const card = this.cardRef.nativeElement;

    card.addEventListener('mousemove', this.onMouseMove);
    card.addEventListener('mouseleave', this.onMouseLeave);
  }

  ngOnDestroy(): void {
    const card = this.cardRef?.nativeElement;
    if (!card) return;

    card.removeEventListener('mousemove', this.onMouseMove);
    card.removeEventListener('mouseleave', this.onMouseLeave);
  }

  private onMouseMove = (event: MouseEvent) => {
    const card = this.cardRef.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * this.rotateAmount;
    const rotateX = -((y / rect.height) - 0.5) * this.rotateAmount;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: 'center',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  private onMouseLeave = () => {
    gsap.to(this.cardRef.nativeElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
  };
}
