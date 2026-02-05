import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';

/**
 * Contact form component with validation, spam protection, and accessibility features.
 * Implements cooldown mechanism to prevent spam submissions.
 * Uses ngx-translate for multilingual error messages.
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  /** Reference to name input element for programmatic focus */
  @ViewChild('nameInputFocus') nameInputFocus!: ElementRef;
  
  /**
   * Initializes contact form component.
   * 
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {FocusService} focusService - Service for managing focus across components
   */
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  /**
   * Lifecycle hook that registers focus method with FocusService.
   * Allows external components to trigger focus on name input.
   */
  ngAfterViewInit(): void {
    this.focusService.registerFocusMethod(() => this.focusNameInput());
  }

  /**
   * Sets keyboard focus to name input field.
   * Used for scroll-to-contact feature from other components.
   */
  focusNameInput(): void {
    this.nameInputFocus.nativeElement.focus();
  }

  /** Injected HttpClient for sending form data to backend */
  http = inject(HttpClient);

  /**
   * Contact form data model.
   * Bound to template via NgModel two-way binding.
   */
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyAccepted: false,
  };

  /**
   * Handles privacy policy checkbox change event.
   * Required because custom checkbox styling prevents default binding.
   * 
   * @param {Event} event - DOM change event from checkbox
   */
  onPrivacyChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.contactData.privacyAccepted = checkbox.checked;
  }

  /**
   * HTTP POST configuration for sending contact form.
   */
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

  /** Timestamp of last successful form submission */
  lastSubmitTime: number | null = null;
  
  /** Cooldown period between submissions in milliseconds (30 seconds) */
  submitCooldown = 30 * 1000;

  /**
   * Checks if form can be submitted based on cooldown timer.
   * Prevents spam by enforcing 30-second wait between submissions.
   * Shows translated cooldown message if attempted too soon.
   * 
   * @returns {boolean} True if submission is allowed, false if in cooldown
   */
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

  /**
   * Handles HTTP response from contact form submission.
   * Shows success or error popup message and resets form.
   * 
   * @param {NgForm} ngForm - Angular form instance for reset
   * @param {boolean} success - Whether submission was successful
   */
  handleResponse(ngForm: NgForm, success: boolean) {
    let message = success
      ? this.translate.instant('CONTACT_FORM.SUCCESS_MESSAGE')
      : this.translate.instant('CONTACT_FORM.ERROR_MESSAGE');
    this.showPopup(message);
    ngForm.resetForm();
    this.contactData.privacyAccepted = false;
  }

  /**
   * Submits contact form data to backend.
   * Validates form and checks cooldown before sending.
   * Handles success/error responses with translated messages.
   * 
   * @param {NgForm} ngForm - Angular form instance with validation state
   */
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

  /**
   * Displays temporary popup notification message.
   * Auto-hides after 5 seconds.
   * 
   * @param {string} message - Message to display in popup
   */
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
