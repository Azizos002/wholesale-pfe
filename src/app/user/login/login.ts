import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

declare const gsap: any;

@Component({ selector: 'app-user-login', imports: [CommonModule, FormsModule, RouterModule], templateUrl: './login.html', styleUrl: './login.css' })
export class LoginComponent {
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  email = ''; password = '';

  login(): void { this.auth.login(this.email); this.router.navigateByUrl('/'); }
  onBtnMove(event: MouseEvent): void { const btn = this.submitBtn?.nativeElement; if (!btn || typeof gsap === 'undefined') return; const r = btn.getBoundingClientRect(); gsap.to(btn, { x: (event.clientX - (r.left + r.width / 2)) * 0.18, y: (event.clientY - (r.top + r.height / 2)) * 0.25, duration: 0.2 }); }
  resetBtn(): void { const btn = this.submitBtn?.nativeElement; if (!btn || typeof gsap === 'undefined') return; gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: 'elastic.out(1, 0.35)' }); }
}
