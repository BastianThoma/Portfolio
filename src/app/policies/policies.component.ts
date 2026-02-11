import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [ImprintComponent, PrivacyPolicyComponent, TranslateModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.translate.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });
  }

  ngOnInit(): void {
    this.updateMetaTags();
  }

  updateMetaTags(): void {
    const isImprint = this.router.url.includes('imprint');
    const titleKey = isImprint ? 'SEO.IMPRINT_TITLE' : 'SEO.PRIVACY_TITLE';
    const descKey = isImprint ? 'SEO.IMPRINT_DESCRIPTION' : 'SEO.PRIVACY_DESCRIPTION';

    this.translate.get([titleKey, descKey]).subscribe(translations => {
      this.titleService.setTitle(translations[titleKey]);
      this.meta.updateTag({ name: 'title', content: translations[titleKey] });
      this.meta.updateTag({ name: 'description', content: translations[descKey] });
      this.meta.updateTag({ property: 'og:title', content: translations[titleKey] });
      this.meta.updateTag({ property: 'og:description', content: translations[descKey] });
      this.meta.updateTag({ property: 'twitter:title', content: translations[titleKey] });
      this.meta.updateTag({ property: 'twitter:description', content: translations[descKey] });
      
      // Update canonical URL
      const canonicalUrl = `https://bastian-thoma.de${this.router.url.split('?')[0]}`;
      this.meta.updateTag({ rel: 'canonical', href: canonicalUrl });
    });
  }
}
