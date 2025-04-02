import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FocusService {
  focusNameInput!: () => void;

  registerFocusMethod(method: () => void): void {
    this.focusNameInput = method;
  }

  triggerFocus(): void {
    if (this.focusNameInput) {
      this.focusNameInput();
    } else {
      console.error('Focus method is not registered.');
    }
  }
}
