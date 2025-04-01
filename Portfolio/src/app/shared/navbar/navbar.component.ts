import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isPopupVisible = false;
  isMenuOpen = false;

  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isPopupVisible ? 'hidden' : '';
  }

  closePopup() {
    this.isPopupVisible = false;
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
