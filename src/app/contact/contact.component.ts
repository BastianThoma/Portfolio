import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';
import Aos from 'aos';

/**
 * Contact section component.
 * Wraps contact form and handles smooth scrolling with offset.
 * Integrates FocusService for accessibility.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {FocusService} focusService - Service for focusing contact form input
   */
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  /**
   * Scrolls to contact form with navbar offset and focuses name input.
   * Offset compensates for fixed navbar height (-70px).
   * Used by navigation links from other sections.
   */
  scrollToContactForm(): void {
    let form = document.getElementById('contactForm');
    if (form) {
      let offset = -70;
      let formPosition = form.getBoundingClientRect().top + window.scrollY + offset;
  
      window.scrollTo({
        top: formPosition,
        behavior: 'smooth',
      });
  
      this.focusService.triggerFocus();
    }
  }

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures contact section animates correctly on scroll.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
