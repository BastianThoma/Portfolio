import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * Navigation bar component with language switching, mobile menu, and accessibility features.
 * Implements focus trap for mobile menu and handles keyboard navigation.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  /** Controls visibility of mobile menu popup */
  isPopupVisible = false;
  
  /** Tracks mobile menu open/closed state for styling */
  isMenuOpen = false;
  
  /** Stores the element that had focus before popup opened, for restoration on close */
  private lastFocusedElement: HTMLElement | null = null;
  
  /** Array of all focusable elements within popup for keyboard navigation */
  private focusableElements: HTMLElement[] = [];

  /** Currently active language code ('en' or 'de') */
  currentLang: string;

  /**
   * Initializes navbar with language detection and translation setup.
   * Checks localStorage first, then browser language, defaults to English.
   * 
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {Router} router - Angular router for navigation
   * @param {ElementRef} elementRef - Reference to component's host element for DOM queries
   */
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

  /**
   * Toggles mobile menu visibility and manages focus trap.
   * Stores current focus before opening, restores it on close.
   * Prevents body scroll when menu is open.
   */
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

  /**
   * Closes mobile menu and restores focus to previously focused element.
   * Re-enables body scrolling.
   */
  closePopup() {
    this.isPopupVisible = false;
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    this.restoreFocus();
  }

  /**
   * Switches application language and persists choice.
   * Updates translation service, localStorage, and HTML lang attribute.
   * Refreshes AOS animations after language change.
   * 
   * @param {string} lang - Language code ('en' or 'de')
   */
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.ngAfterViewInit();
  }

  /**
   * Lifecycle hook that refreshes AOS (Animate On Scroll) animations.
   * Called after view initialization and language changes.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }

  /**
   * Keyboard event handler for ESC key.
   * Closes mobile menu when ESC is pressed (WCAG 2.1 requirement).
   */
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isPopupVisible) {
      this.closePopup();
    }
  }

  /**
   * Implements focus trap for mobile menu using TAB key interception.
   * Prevents keyboard navigation from leaving popup.
   * TAB moves forward, SHIFT+TAB moves backward, wrapping at boundaries.
   * 
   * @param {any} event - Keyboard event (typed as any due to Angular HostListener limitation)
   */
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

  /**
   * Sets up focus trap by finding all focusable elements in popup.
   * Focuses first element automatically.
   * Called after popup opens on next tick to ensure DOM is ready.
   * 
   * @private
   */
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

  /**
   * Restores keyboard focus to element that was active before popup opened.
   * Improves accessibility by maintaining user's navigation context.
   * 
   * @private
   */
  private restoreFocus() {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  /**
   * Navigates to homepage or reloads if already on homepage.
   * Ensures logo click always provides visual feedback.
   */
  navigateToMainPage() {
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }
}
