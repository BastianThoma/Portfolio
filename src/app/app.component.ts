import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import Aos from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private translate: TranslateService,
    private meta: Meta,
    private titleService: Title
  ) {
    this.translate.addLangs(['en', 'de']);
    
    let browserLang = navigator.language.split('-')[0];
    let currentLang =
      localStorage.getItem('language') ||
      (['de', 'en'].includes(browserLang) ? browserLang : 'en');
    
    this.translate.setDefaultLang(currentLang);
    this.translate.use(currentLang);
    document.documentElement.lang = currentLang;

    this.translate.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });
  }

  title = 'Portfolio';

  ngOnInit(): void {
    Aos.init({
      easing: 'ease-in-out',
    });
    this.updateMetaTags();
  }

  updateMetaTags(): void {
    this.translate.get([
      'SEO.TITLE',
      'SEO.DESCRIPTION',
      'SEO.KEYWORDS',
      'SEO.OG_TITLE',
      'SEO.OG_DESCRIPTION'
    ]).subscribe(translations => {
      this.titleService.setTitle(translations['SEO.TITLE']);

      this.meta.updateTag({ name: 'title', content: translations['SEO.TITLE'] });
      this.meta.updateTag({ name: 'description', content: translations['SEO.DESCRIPTION'] });
      this.meta.updateTag({ name: 'keywords', content: translations['SEO.KEYWORDS'] });

      this.meta.updateTag({ property: 'og:title', content: translations['SEO.OG_TITLE'] });
      this.meta.updateTag({ property: 'og:description', content: translations['SEO.OG_DESCRIPTION'] });
      this.meta.updateTag({ property: 'og:locale', content: this.translate.currentLang === 'de' ? 'de_DE' : 'en_US' });

      this.meta.updateTag({ property: 'twitter:title', content: translations['SEO.OG_TITLE'] });
      this.meta.updateTag({ property: 'twitter:description', content: translations['SEO.OG_DESCRIPTION'] });

      // Hreflang Tags
      this.updateHreflangTags('/');
    });
  }

  updateHreflangTags(path: string): void {
    const baseUrl = 'https://bastian-thoma.de';
    
    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[hreflang]');
    existingTags.forEach(tag => tag.remove());

    // Add new hreflang tags
    const hreflangTags = [
      { hreflang: 'de', href: `${baseUrl}${path}` },
      { hreflang: 'en', href: `${baseUrl}${path}` },
      { hreflang: 'x-default', href: `${baseUrl}${path}` }
    ];

    hreflangTags.forEach(tag => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', tag.hreflang);
      link.setAttribute('href', tag.href);
      document.head.appendChild(link);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      Aos.refresh();
    }, 300);
  }

  @HostListener('window:resize')
  onResize() {
    Aos.refresh();
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
