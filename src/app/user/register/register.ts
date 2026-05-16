import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const gsap: any;

@Component({
  selector: 'app-user-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  @ViewChild('submitBtn') submitBtn!: ElementRef<HTMLButtonElement>;

  fullName = '';
  email = '';
  password = '';

  onBtnMove(event: MouseEvent): void {
    const btn = this.submitBtn?.nativeElement;
    if (!btn || typeof gsap === 'undefined') return;
    const r = btn.getBoundingClientRect();
    gsap.to(btn, { x: (event.clientX - (r.left + r.width / 2)) * 0.18, y: (event.clientY - (r.top + r.height / 2)) * 0.25, duration: 0.2 });
  }

  resetBtn(): void {
    const btn = this.submitBtn?.nativeElement;
    if (!btn || typeof gsap === 'undefined') return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: 'elastic.out(1, 0.35)' });
  }
}
