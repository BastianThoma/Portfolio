import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  private lastFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  constructor(
    private translate: TranslateService,
    private elementRef: ElementRef
  ) {}

  isPopupVisible = false;

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

  currentProject = this.projects[0];

  showPopup() {
    this.isPopupVisible = true;
    document.body.style.overflow = 'hidden';

    // Store currently focused element
    this.lastFocusedElement = document.activeElement as HTMLElement;
    // Set focus trap on next tick
    setTimeout(() => this.setFocusTrap(), 0);
  }

  closePopup() {
    this.isPopupVisible = false;
    document.body.style.overflow = '';
    this.restoreFocus();
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

  private restoreFocus() {
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  nextProject() {
    const currentIndex = this.projects.indexOf(this.currentProject);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    this.currentProject = this.projects[nextIndex];
  }

  showPopupWithIndex(index: number) {
    this.currentProject = this.projects[index];
    this.showPopup();
  }
}
