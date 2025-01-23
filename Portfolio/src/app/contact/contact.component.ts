import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(private translate: TranslateService) {}
}
