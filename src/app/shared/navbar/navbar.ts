import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, afterNextRender, inject, signal, viewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

declare global {
  interface Window {
    gsap?: {
      fromTo: (...args: unknown[]) => void;
      to: (...args: unknown[]) => void;
    };
  }
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  private readonly links = viewChildren<ElementRef<HTMLElement>>('liquidLink');
  private readonly actionButtons = viewChildren<ElementRef<HTMLElement>>('magneticBtn');
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly isDark = signal(false);
  readonly currentLanguage = signal<'en' | 'fr' | 'ar'>('en');

  readonly navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Products', route: '/products' },
    { label: 'Cart', route: '/cart' }
  ];

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    afterNextRender(() => {
      this.initializeGsapHover();
      this.initializeMagneticButtons();
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  toggleTheme(): void { this.isDark.update((value) => !value); this.document.documentElement.classList.toggle('dark', this.isDark()); }
  changeLanguage(value: string): void { if (value === 'ar') { this.currentLanguage.set('ar'); this.document.documentElement.dir = 'rtl'; return; } this.document.documentElement.dir = 'ltr'; this.currentLanguage.set(value === 'fr' ? 'fr' : 'en'); }

  private initializeGsapHover(): void {
    if (!window.gsap) return;
    this.links().forEach((linkRef) => {
      const element = linkRef.nativeElement;
      element.addEventListener('mouseenter', () => window.gsap?.fromTo(element, { backgroundPositionX: '120%' }, { backgroundPositionX: '0%', duration: 0.6 }));
    });
  }

  private initializeMagneticButtons(): void {
    if (!window.gsap) return;
    this.actionButtons().forEach((buttonRef) => {
      const element = buttonRef.nativeElement;
      element.addEventListener('mouseenter', () => window.gsap?.to(element, { scale: 1.04, duration: 0.25 }));
      element.addEventListener('mouseleave', () => window.gsap?.to(element, { scale: 1, duration: 0.25 }));
    });
  }
}
