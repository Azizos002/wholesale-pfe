import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
import { NavbarComponent } from './shared/navbar/navbar';

declare const gsap: any;
declare const ScrollTrigger: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChildren('heroWord') heroWords!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef<HTMLElement>;
  @ViewChild('heroCta') heroCta!: ElementRef<HTMLElement>;
  @ViewChildren('bentoCard') bentoCards!: QueryList<ElementRef<HTMLElement>>;

  readonly categories = [
    { name: 'Epicerie Fine', description: 'Selections artisanales pour tables exigeantes.', span: 'md:col-span-2 md:row-span-2' },
    { name: 'Boissons', description: 'Jus premium, nectars et signatures rafraîchissantes.', span: 'md:col-span-1 md:row-span-2' },
    { name: 'Snacking', description: 'Formats pratiques à forte rotation.', span: 'md:col-span-1 md:row-span-1' },
    { name: 'Bio & Naturel', description: 'Références clean label en pleine croissance.', span: 'md:col-span-2 md:row-span-1' }
  ];

  readonly featuredProducts = [
    { name: 'Huile d’Olive Réserve', price: '$48', unit: '/ carton', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80' },
    { name: 'Café Signature Arabica', price: '$62', unit: '/ sac', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' },
    { name: 'Miel de Montagne', price: '$39', unit: '/ lot', image: 'https://images.unsplash.com/photo-1587049016823-69ef8f7fbb08?auto=format&fit=crop&w=900&q=80' },
    { name: 'Chocolat Noir 72%', price: '$44', unit: '/ caisse', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80' }
  ];

  ngAfterViewInit(): void {
    if (typeof gsap === 'undefined') {
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.set(this.heroWords.map((w) => w.nativeElement), { yPercent: 130, opacity: 0, rotateX: -75 });
    gsap.set(this.heroSubtitle.nativeElement, { y: 32, opacity: 0 });
    gsap.set(this.heroCta.nativeElement, { scale: 0.9, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to(this.heroWords.map((w) => w.nativeElement), {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.12,
      duration: 1.1
    })
      .to(this.heroSubtitle.nativeElement, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .to(this.heroCta.nativeElement, { scale: 1, opacity: 1, duration: 0.7 }, '-=0.45');

    this.bentoCards.forEach((card, index) => {
      gsap.fromTo(
        card.nativeElement,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: index * 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card.nativeElement,
            start: 'top 85%'
          }
        }
      );
    });
  }
}
