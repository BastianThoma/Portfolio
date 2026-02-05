import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

/**
 * Project detail popup component with carousel functionality.
 * Displays full project information in modal overlay with focus trap.
 * Supports keyboard navigation (ESC to close, TAB for focus management).
 */
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  /** Stores element that had focus before popup opened, for restoration on close */
  private lastFocusedElement: HTMLElement | null = null;
  
  /** Array of all focusable elements within popup for keyboard navigation */
  private focusableElements: HTMLElement[] = [];

  /**
   * Initializes popup component.
   * 
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {ElementRef} elementRef - Reference to component's host element for DOM queries
   */
  constructor(
    private translate: TranslateService,
    private elementRef: ElementRef
  ) {}

  /** Controls visibility of popup modal */
  isPopupVisible = false;

  /**
   * Portfolio projects data.
   * @type {Array<{projectNumber: string, projectTitle: string, projectDescriptionTitle: string, projectDescription: string, projectImage: string, githubLink: string, liveTestLink: string, techStack: Array<{name: string, icon: string}>}>}
   */
  projects = [
    {
      projectNumber: '01',
      projectTitle: 'Pokedex',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION1',
      projectImage: '/assets/img/pokedex.png',
      githubLink: 'https://github.com/BastianThoma/PokeDex',
      liveTestLink: '/projects/pokedex',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
        { name: 'API', icon: '/assets/img/colored-icons/api_colored.png' },
      ],
    },
    {
      projectNumber: '02',
      projectTitle: 'Join',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION2',
      projectImage: '/assets/img/join.png',
      githubLink: 'https://github.com/BastianThoma/join',
      liveTestLink: '/projects/join/Login.html',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
      ],
    },
    {
      projectNumber: '03',
      projectTitle: 'El Pollo Loco',
      projectDescriptionTitle: 'POPUP.DESCRIPTION_TITLE',
      projectDescription: 'POPUP.DESCRIPTION3',
      projectImage: '/assets/img/el_pollo_loco.png',
      githubLink: 'https://github.com/BastianThoma/El-Pollo-Loco',
      liveTestLink: '/projects/el-pollo-loco',
      techStack: [
        { name: 'HTML', icon: '/assets/img/colored-icons/html_colored.png' },
        { name: 'CSS', icon: '/assets/img/colored-icons/css_colored.png' },
        {
          name: 'JavaScript',
          icon: '/assets/img/colored-icons/js_colored.png',
        },
      ],
    },
  ];

  /** Currently displayed project in popup, defaults to first project */
  currentProject = this.projects[0];

  /**
   * Opens project detail popup and initializes focus trap.
   * Prevents body scrolling while popup is open.
   * Stores current focus for restoration on close.
   */
  showPopup() {
    this.isPopupVisible = true;
    document.body.style.overflow = 'hidden';

    // Store currently focused element
    this.lastFocusedElement = document.activeElement as HTMLElement;
    // Set focus trap on next tick
    setTimeout(() => this.setFocusTrap(), 0);
  }

  /**
   * Closes popup and restores focus to previously focused element.
   * Re-enables body scrolling.
   */
  closePopup() {
    this.isPopupVisible = false;
    document.body.style.overflow = '';
    this.restoreFocus();
  }

  /**
   * Keyboard event handler for ESC key.
   * Closes popup when ESC is pressed (WCAG 2.1 requirement).
   */
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isPopupVisible) {
      this.closePopup();
    }
  }

  /**
   * Implements focus trap for popup using TAB key interception.
   * Prevents keyboard navigation from leaving popup modal.
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
   * Automatically focuses close button (first element).
   * Called after popup opens on next tick to ensure DOM is ready.
   * 
   * @private
   */
  private setFocusTrap() {
    const popupContent = this.elementRef.nativeElement.querySelector('.popupContent');
    if (!popupContent) return;

    // Get all focusable elements within popup
    const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(popupContent.querySelectorAll(focusableSelectors));

    // Focus first element (close button)
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
   * Opens external link in new browser tab.
   * Used for GitHub repository and live demo links.
   * 
   * @param {string} url - URL to open
   */
  openLink(url: string) {
    window.open(url, '_blank');
  }

  /**
   * Advances to next project in carousel.
   * Loops back to first project after last one.
   */
  nextProject() {
    const currentIndex = this.projects.indexOf(this.currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    this.currentProject = this.projects[nextIndex];
  }

  /**
   * Opens popup with specific project by index.
   * Used when clicking project cards in portfolio.
   * 
   * @param {number} index - Zero-based index of project to display
   */
  showPopupWithIndex(index: number) {
    this.currentProject = this.projects[index];
    this.showPopup();
  }
}
