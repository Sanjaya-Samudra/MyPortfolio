import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Category = 'Hackathons' | 'Programs';

interface ParticipatedProject {
  name: string;
  description: string;
  iconPath: string;          // public folder => use "fileName.ext"
  certificateUrl?: string;   // public folder => use "fileName.ext"
  year: number;
  accent: string;
  category: Category;
  tags: string[];
  highlight: string;
}

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participations.component.html',
  styleUrl: './participations.component.css'
})
export class ParticipationsComponent implements OnInit, OnDestroy {
  activeCategory: Category = 'Hackathons';
  currentIndex = 0;

  activeCertificate: ParticipatedProject | null = null;

  // Typewriter: type slowly, HOLD, then CLEAR instantly, then restart smoothly
  taglineFull =
    'Built in motion, refined with purpose—this is my aura in progress and my legacy in prototypes.';
  taglineDisplay = '';
  taglineResetPulse = false;

  private timer: number | null = null;
  private idx = 0;

  participatedProjects: ParticipatedProject[] = [
    {
      name: 'Japura Xtreame Inter University Hackathon',
      description:
        'Delivered a complete prototype under strict time constraints with clear team roles, rapid iteration, and a final pitch. Achieved Top 35 placement—execution, clarity, and teamwork.',
      iconPath: 'hackathon.jpg',
      // certificateUrl: 'japura-xtreame.pdf',
      year: 2024,
      accent: '#12b981',
      category: 'Hackathons',
      tags: ['Teamwork', 'Rapid Build', 'Pitch'],
      highlight: 'Top 35'
    },
    {
      name: 'Japura Xtreme Inter University Hackathon 2.0',
      description:
        'Built and delivered a functional prototype within intense time constraints, demonstrating strong self control, rapid problem-solving, and a confident final pitch. Secured a Top 20 placement through execution quality and clarity.',
      iconPath: 'JapuraXtreme2.png',
      certificateUrl: 'JapuraXtreme2.png',
      year: 2025,
      accent: '#12b981',
      category: 'Hackathons',
      tags: ['Rapid Build', 'Pitch'],
      highlight: 'Top 20'
    },
    {
      name: 'DevQest - Inter University Hackathon',
      description:
        'Inter-university hackathon participation focused on ideation, UI structure, and delivering a cohesive prototype with strong presentation clarity.',
      iconPath: 'DevQuest2024.jpeg',
      certificateUrl: 'DevQuest2024.jpeg',
      year: 2025,
      accent: '#f0438c',
      category: 'Hackathons',
      tags: ['Innovation', 'UX', 'Collaboration'],
      highlight: 'Inter-Uni'
    },
    {
      name: 'SpiritX',
      description:
        'Hackathon centered on solving real-world problems through web/app solutions. Emphasized problem framing, iterative design, and fast delivery of a polished demo.',
      iconPath: 'SpiritX2024.jpeg',
      certificateUrl: 'SpiritX2024.jpeg',
      year: 2024,
      accent: '#22c55e',
      category: 'Hackathons',
      tags: ['Prototype', 'Problem Solving', 'Execution'],
      highlight: 'Prototype'
    },
    {
      name: 'Google Developer Group (GDG) Program',
      description:
        'Program participation through workshops and community sessions to improve practical skills, connect with peers, and engage with modern tooling and best practices.',
      iconPath: 'gdg.PNG',
      // certificateUrl: 'gdg.jpg',
      year: 2024,
      accent: '#6366f1',
      category: 'Programs',
      tags: ['Workshops', 'Community', 'Learning'],
      highlight: 'Program'
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.runTypewriter();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private runTypewriter(): void {
    const typeSpeed = 55;     // slower, nicer
    const holdTime = 1800;    // stays when complete
    const clearPause = 380;   // small pause after clearing

    const tick = () => {
      // typing forward only
      this.idx = Math.min(this.idx + 1, this.taglineFull.length);
      this.taglineDisplay = this.taglineFull.slice(0, this.idx);

      if (this.idx >= this.taglineFull.length) {
        // HOLD fully written
        this.timer = window.setTimeout(() => {
          // CLEAR instantly
          this.taglineResetPulse = true; // gives a soft fade pop
          this.taglineDisplay = '';
          this.idx = 0;

          // turn off pulse after a moment
          window.setTimeout(() => (this.taglineResetPulse = false), 120);

          // restart smoothly
          this.timer = window.setTimeout(tick, clearPause);
        }, holdTime);
        return;
      }

      this.timer = window.setTimeout(tick, typeSpeed);
    };

    tick();
  }

  trackByName(_: number, item: ParticipatedProject): string {
    return item.name;
  }

  get currentProjects(): ParticipatedProject[] {
    return this.participatedProjects.filter(p => p.category === this.activeCategory);
  }

  get currentCounts(): { hackathons: number; programs: number } {
    return {
      hackathons: this.participatedProjects.filter(p => p.category === 'Hackathons').length,
      programs: this.participatedProjects.filter(p => p.category === 'Programs').length
    };
  }

  setCategory(cat: Category): void {
    if (this.activeCategory === cat) return;
    this.activeCategory = cat;
    this.currentIndex = 0;
  }

  goTo(index: number): void {
    const len = this.currentProjects.length;
    if (len === 0) return;
    this.currentIndex = ((index % len) + len) % len;
  }

  prev(): void {
    const len = this.currentProjects.length;
    if (len <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + len) % len;
  }

  next(): void {
    const len = this.currentProjects.length;
    if (len <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % len;
  }

  /**
   * Slots:
   * -1 prev, 0 active, 1 next, 99 hidden
   */
  getSlot(i: number): number {
    const len = this.currentProjects.length;
    if (len === 0) return 99;

    const prev = (this.currentIndex - 1 + len) % len;
    const next = (this.currentIndex + 1) % len;

    if (i === this.currentIndex) return 0;
    if (i === prev) return -1;
    if (i === next) return 1;

    return 99;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (this.activeCertificate) {
      if (e.key === 'Escape') this.closeCertificate();
      return;
    }

    const target = e.target as HTMLElement | null;
    const tag = target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  onCardMove(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  }

  onCardLeave(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement | null;
    if (!el) return;

    el.style.setProperty('--x', `50%`);
    el.style.setProperty('--y', `45%`);
  }

  openCertificate(project: ParticipatedProject): void {
    if (!project.certificateUrl) return;
    this.activeCertificate = project;
  }

  closeCertificate(): void {
    this.activeCertificate = null;
  }

  isPdf(url?: string): boolean {
    if (!url) return false;
    return /\.pdf(\?.*)?$/i.test(url);
  }

  safeUrl(url?: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url || '');
  }
}
