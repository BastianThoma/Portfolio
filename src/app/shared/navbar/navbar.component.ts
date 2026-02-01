import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

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

  constructor(private translate: TranslateService, private router: Router) {
    let browserLang = navigator.language.split('-')[0];
    this.currentLang =
      localStorage.getItem('language') ||
      (['de', 'en'].includes(browserLang) ? browserLang : 'en');
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
    document.documentElement.lang = this.currentLang;
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
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isPopupVisible) {
      this.closePopup();
    }
  }

  navigateToMainPage() {
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }
}
