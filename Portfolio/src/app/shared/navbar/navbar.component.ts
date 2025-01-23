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

  // Variable, die die aktuelle Sprache verfolgt
  currentLang: string;

  constructor(private translate: TranslateService) {
    // Initialisiere die aktuelle Sprache mit der in TranslateService gesetzten Sprache
    this.currentLang = this.translate.currentLang || 'en';

    // Überwache die Sprache, wenn sie geändert wird
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
    // Wenn die Sprache geändert wird, setzen wir die aktuelle Sprache und die "selected" Klasse
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
