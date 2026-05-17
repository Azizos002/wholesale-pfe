import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import gsap from '../../shared/gsap-lite';
import { ProductCardComponent } from '../products/product-card/product-card';
import { Category, Product } from '../../user.products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection', { static: true }) heroSectionRef!: ElementRef<HTMLElement>;
  @ViewChildren('heroWord') heroWords!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('parallaxText') parallaxText!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('orb') parallaxOrbs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('bentoCard') bentoCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('productCard') productCards!: QueryList<ElementRef<HTMLElement>>;

  readonly categories: Category[] = [
    { id: 1, name: 'Artisanal Pantry' },
    { id: 2, name: 'Frozen Gourmet' },
    { id: 3, name: 'Organic Essentials' },
    { id: 4, name: 'Hospitality Bulk' }
  ];

  readonly featuredProducts: Product[] = [
    { id: 1, name: 'Truffle Olive Tapenade', price: 18, imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900', categoryId: 1 },
    { id: 2, name: 'Saffron Infused Honey', price: 24, imageUrl: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=900', categoryId: 1 },
    { id: 3, name: 'Mediterranean Mezze Kit', price: 31, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900', categoryId: 2 },
    { id: 4, name: 'Smoked Chili Pistachios', price: 16, imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=900', categoryId: 3 }
  ];

  private handleScroll = () => this.updateParallax();

  ngAfterViewInit(): void {
    this.animateHeroReveal();
    this.setupBentoHover();
    this.setupProductScrollReveal();
    this.updateParallax();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onBentoMove(event: MouseEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.classList.add('is-active');
  }

  onBentoLeave(card: HTMLElement): void {
    card.classList.remove('is-active');
  }

  private animateHeroReveal(): void {
    gsap.fromTo(this.heroWords.map((item) => item.nativeElement), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, stagger: 0.08 });
  }

  private setupBentoHover(): void {
    this.bentoCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  }

  private setupProductScrollReveal(): void {
    this.productCards.forEach((cardRef) => {
      const card = cardRef.nativeElement;
      card.style.opacity = '0';
      card.style.transform = 'translateY(48px)';
    });
    this.revealProductsInView();
  }

  private revealProductsInView(): void {
    this.productCards.forEach((cardRef, index) => {
      const card = cardRef.nativeElement;
      const rect = card.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9;
      if (!inView || card.dataset['revealed']) return;

      card.dataset['revealed'] = 'true';
      gsap.to(card, { y: 0, opacity: 1, duration: 1, stagger: index * 0.05, ease: 'elastic.out(1, 0.5)' });
    });
  }

  private updateParallax(): void {
    const hero = this.heroSectionRef.nativeElement;
    const { top } = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(-top / window.innerHeight, 0), 1.2);

    this.parallaxText.forEach((item, i) => {
      gsap.to(item.nativeElement, { y: -progress * (110 + i * 22), duration: 0.25 });
    });

    this.parallaxOrbs.forEach((item, i) => {
      gsap.to(item.nativeElement, { y: progress * (35 + i * 18), duration: 0.25 });
    });

    this.revealProductsInView();
  }
}
