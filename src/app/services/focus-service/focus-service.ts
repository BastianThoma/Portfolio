import { Injectable } from '@angular/core';

/**
 * Service for managing focus across application components.
 * Allows external components to trigger focus on contact form name input.
 * Used for "Contact Me" button functionality from landing page.
 * 
 * @Injectable - Provided in root for singleton instance
 */
@Injectable({ providedIn: 'root' })
export class FocusService {
  /** Registered callback function that focuses name input field */
  focusNameInput!: () => void;

  /**
   * Registers focus method from contact form component.
   * Should be called in ngAfterViewInit to ensure element exists.
   * 
   * @param {() => void} method - Callback function that focuses name input
   */
  registerFocusMethod(method: () => void): void {
    this.focusNameInput = method;
  }

  /**
   * Triggers focus on contact form name input.
   * Logs error if method not yet registered (component not initialized).
   */
  triggerFocus(): void {
    if (this.focusNameInput) {
      this.focusNameInput();
    } else {
      console.error('Focus method is not registered.');
    }
  }
}
