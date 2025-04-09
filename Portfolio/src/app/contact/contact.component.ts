import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';
import Aos from 'aos';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

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

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
