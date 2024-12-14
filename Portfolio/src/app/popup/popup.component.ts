import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  isPopupVisible = false;

  showPopup() {
    this.isPopupVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupVisible = false;
    document.body.style.overflow = '';
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
