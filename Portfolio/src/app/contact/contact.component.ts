import { Component, ViewChild } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  scrollToContactForm(): void {
    document
      .getElementById('contactForm')
      ?.scrollIntoView({ behavior: 'smooth' });
    this.focusService.triggerFocus();
  }
}
