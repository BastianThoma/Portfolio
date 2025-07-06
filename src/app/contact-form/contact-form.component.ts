import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @ViewChild('nameInputFocus') nameInputFocus!: ElementRef;
  
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  ngAfterViewInit(): void {
    this.focusService.registerFocusMethod(() => this.focusNameInput());
  }

  focusNameInput(): void {
    this.nameInputFocus.nativeElement.focus();
  }

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false,
  };

  onPrivacyChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.contactData.privacyAccepted = checkbox.checked;
  }

  post = {
    endPoint: 'https://bastian-thoma.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  lastSubmitTime: number | null = null;
  submitCooldown = 30 * 1000;

  canSubmit(): boolean {
    let currentTime = Date.now();
    if (
      this.lastSubmitTime &&
      currentTime - this.lastSubmitTime < this.submitCooldown
    ) {
      this.showPopup(this.translate.instant('CONTACT_FORM.COOLDOWN_MESSAGE'));
      return false;
    }
    this.lastSubmitTime = currentTime;
    return true;
  }

  handleResponse(ngForm: NgForm, success: boolean) {
    let message = success
      ? this.translate.instant('CONTACT_FORM.SUCCESS_MESSAGE')
      : this.translate.instant('CONTACT_FORM.ERROR_MESSAGE');
    this.showPopup(message);
    ngForm.resetForm();
    this.contactData.privacyAccepted = false;
  }

  onSubmit(ngForm: NgForm) {
    if (!this.canSubmit()) return;

    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => this.handleResponse(ngForm, true),
          error: (error) => {
            console.error(error);
            this.handleResponse(ngForm, false);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  showPopup(message: string) {
    let popup = document.getElementById('popup');
    let popupMessage = document.getElementById('popupMessage');
    if (popup && popupMessage) {
      popupMessage.textContent = message;
      popup.classList.add('show');
      setTimeout(() => {
        if (popup) {
          popup.classList.remove('show');
        }
      }, 5000);
    }
  }
}
