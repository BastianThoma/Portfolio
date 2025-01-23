import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    TranslateModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  constructor(private translate: TranslateService) {}

  contactData = { name: '', email: '', message: '', privacyAccepted: false };

  // Methode für das Checkbox-Ändern
  onPrivacyChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.contactData.privacyAccepted = checkbox.checked;
  }

  // Methode zur Formularübermittlung
  onSubmit() {
    console.log(this.contactData);
  }
}
