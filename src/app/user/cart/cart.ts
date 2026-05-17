import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare const gsap: any;

interface CartItem {
  id: number;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-user-cart',
  imports: [CommonModule, TranslateModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements AfterViewInit {
  @ViewChildren('cartCard') cartCards!: QueryList<ElementRef<HTMLElement>>;

  items: CartItem[] = [
    { id: 1, name: 'Huile d’Olive Réserve', category: 'Épicerie Fine', unitPrice: 48, quantity: 1, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Café Signature Arabica', category: 'Boissons', unitPrice: 62, quantity: 2, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Miel de Montagne', category: 'Bio & Naturel', unitPrice: 39, quantity: 1, image: 'https://images.unsplash.com/photo-1587049016823-69ef8f7fbb08?auto=format&fit=crop&w=500&q=80' }
  ];

  get subtotal(): number { return this.items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0); }
  get shipping(): number { return this.items.length ? 8 : 0; }
  get total(): number { return this.subtotal + this.shipping; }

  ngAfterViewInit(): void {
    this.animateEntrance();
  }

  private animateEntrance(): void {
    if (typeof gsap === 'undefined') return;
    const isRtl = document?.documentElement?.dir === 'rtl';
    gsap.from(this.cartCards.map((card) => card.nativeElement), {
      x: isRtl ? -80 : 80,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }

  removeItem(item: CartItem, event?: Event): void {
    const card = (event?.currentTarget as HTMLElement | null)?.closest('[data-cart-card]') as HTMLElement | null;
    if (typeof gsap === 'undefined' || !card) {
      this.items = this.items.filter((x) => x.id !== item.id);
      return;
    }

    gsap.to(card, {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      scaleY: 0.92,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        this.items = this.items.filter((x) => x.id !== item.id);
      }
    });
  }
}
