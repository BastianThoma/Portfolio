import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../section-card/section-card.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';
import Aos from 'aos';

/**
 * Skills section component displaying technical competencies.
 * Features interactive skill icons with hover effects.
 * Icons change from white to colored on hover for visual feedback.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionCardComponent, CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {FocusService} focusService - Service for focusing contact form
   */
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
  ) {}

  /**
   * Smoothly scrolls to contact form and focuses name input.
   * Used by "Let's work together" call-to-action button.
   */
  scrollToContactForm(): void {
    document
      .getElementById('contactForm')
      ?.scrollIntoView({ behavior: 'smooth' });
    this.focusService.triggerFocus();
  }

  /**
   * Array of technical skills with icon paths and hover states.
   * Each skill has white icon (default) and colored icon (hover).
   */
  skills = [
    {
      icon: '/assets/img/white-icons/html.png',
      coloredIcon: '/assets/img/colored-icons/html_colored.png',
      label: 'HTML',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/css.png',
      coloredIcon: '/assets/img/colored-icons/css_colored.png',
      label: 'CSS',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/javascript.png',
      coloredIcon: '/assets/img/colored-icons/js_colored.png',
      label: 'JavaScript',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/typescript.png',
      coloredIcon: '/assets/img/colored-icons/ts_colored.png',
      label: 'TypeScript',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/angular.png',
      coloredIcon: '/assets/img/colored-icons/angular_colored.png',
      label: 'Angular',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/firebase.png',
      coloredIcon: '/assets/img/colored-icons/firebase_colored.png',
      label: 'Firebase',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/material_design.png',
      coloredIcon: '/assets/img/colored-icons/md_colored.png',
      label: 'Material Design',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/git.png',
      coloredIcon: '/assets/img/colored-icons/git_colored.png',
      label: 'Git',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/api.png',
      coloredIcon: '/assets/img/colored-icons/api_colored.png',
      label: 'API',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/python.png',
      coloredIcon: '/assets/img/colored-icons/python_colored.png',
      label: 'Python',
      hovered: false,
    },
    {
      icon: '/assets/img/white-icons/scrum.png',
      coloredIcon: '/assets/img/colored-icons/scrum_colored.png',
      label: 'Scrum',
      hovered: false,
    },
    {
      icon: '/assets/img/colored-icons/growth_mindset.png',
      coloredIcon: '/assets/img/colored-icons/growth_mindset.png',
      label: 'Growth Mindset',
      hovered: false,
    },
  ];

  /**
   * Handles hover state for skill icons.
   * Toggles between white and colored icons.
   * 
   * @param {any} skill - Skill object from skills array
   * @param {boolean} state - True when hovering, false when not
   */
  onHover(skill: any, state: boolean): void {
    skill.hovered = state;
  }

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures skills section animates correctly on scroll.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
