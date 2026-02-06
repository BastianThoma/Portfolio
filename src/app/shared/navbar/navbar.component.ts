import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  isPopupVisible = false;
  isMenuOpen = false;
  private lastFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  currentLang: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    let browserLang = navigator.language.split('-')[0];
    this.currentLang =
      localStorage.getItem('language') ||
      (['de', 'en'].includes(browserLang) ? browserLang : 'en');
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
    document.documentElement.lang = this.currentLang;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isPopupVisible ? 'hidden' : '';

    if (this.isPopupVisible) {
      // Store currently focused element
      this.lastFocusedElement = document.activeElement as HTMLElement;
      // Set focus trap on next tick
      setTimeout(() => this.setFocusTrap(), 0);
    } else {
      // Restore focus when closing
      this.restoreFocus();
    }
  }

  closePopup() {
    this.isPopupVisible = false;
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    this.restoreFocus();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isPopupVisible) {
      this.closePopup();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  handleTabKey(event: any) {
    if (!this.isPopupVisible || this.focusableElements.length === 0) {
      return;
    }

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // SHIFT + TAB: move backwards
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // TAB: move forwards
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private setFocusTrap() {
    const popup = this.elementRef.nativeElement.querySelector('.popup');
    if (!popup) return;

    // Get all focusable elements within popup
    const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(popup.querySelectorAll(focusableSelectors));

    // Focus first element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  private restoreFocus() {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  navigateToMainPage() {
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }
}
