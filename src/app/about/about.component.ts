import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type StackItem = { name: string; icon: string };

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  displayedText = '';

  private phrases: string[] = [
    'Sanjaya Samudra • Full-Stack Developer',
    'Angular Specialist • UX-First Builder',
    'Scalable Apps • Clean UI • Fast Performance'
  ];
  private typingSpeedMs = 38;
  private deletingSpeedMs = 24;
  private pauseMs = 1100;

  private phraseIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private typingTimer?: number;

  cvUrl = '/path-to-your-cv.pdf';

  technologies: StackItem[] = [
    { name: 'Angular', icon: '/angular.svg' },
    { name: 'TypeScript', icon: '/typescript.svg' },
    { name: 'JavaScript', icon: '/javascript.svg' },
    { name: 'HTML', icon: '/html.svg' },
    { name: 'CSS', icon: '/css.svg' },
    { name: 'Node.js', icon: '/node.svg' },
    { name: 'Python', icon: '/python.svg' },
    { name: 'React', icon: '/react.svg' },
    { name: 'Next.js', icon: '/nextjs.svg' },
    { name: 'Tailwind CSS', icon: '/tailwind.svg' }
  ];

  tools: StackItem[] = [
    { name: 'GitHub', icon: '/github.svg' },
    { name: 'VS Code', icon: '/vscode.svg' },
    { name: 'Figma', icon: '/figma.svg' },
    { name: 'Postman', icon: '/postman.svg' },
    { name: 'MySQL', icon: '/mysql.svg' },
    { name: 'Spring Boot', icon: '/spring-boot.svg' }
  ];

  // Avatar interactions
  private baseRotationDeg = 0;
  private tiltX = 0;
  private tiltY = 0;
  avatarTransform = 'perspective(900px) rotate(0deg) rotateX(0deg) rotateY(0deg)';

  // Spotlight follow
  spotlightTransform = 'translate3d(0px, 0px, 0)';

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) window.clearTimeout(this.typingTimer);
  }

  private startTypewriter(): void {
    const tick = () => {
      const current = this.phrases[this.phraseIndex] ?? '';

      if (!this.deleting) {
        this.displayedText = current.slice(0, this.charIndex + 1);
        this.charIndex++;

        if (this.charIndex === current.length) {
          this.deleting = true;
          this.typingTimer = window.setTimeout(tick, this.pauseMs);
          return;
        }

        this.typingTimer = window.setTimeout(tick, this.typingSpeedMs);
        return;
      }

      this.displayedText = current.slice(0, Math.max(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex <= 0) {
        this.deleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.typingTimer = window.setTimeout(tick, 240);
        return;
      }

      this.typingTimer = window.setTimeout(tick, this.deletingSpeedMs);
    };

    tick();
  }

  rotateImage(): void {
    this.baseRotationDeg = (this.baseRotationDeg + 45) % 360;
    this.updateAvatarTransform();
  }

  onAvatarMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.tiltY = (x - 0.5) * 12;
    this.tiltX = (0.5 - y) * 10;
    this.updateAvatarTransform();
  }

  onAvatarLeave(): void {
    this.tiltX = 0;
    this.tiltY = 0;
    this.updateAvatarTransform();
  }

  private updateAvatarTransform(): void {
    this.avatarTransform =
      `perspective(900px) rotate(${this.baseRotationDeg}deg) rotateX(${this.tiltX}deg) rotateY(${this.tiltY}deg)`;
  }

  onSpotlightMove(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.classList.add('spot-on');
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.spotlightTransform = `translate3d(${x - rect.width / 2}px, ${y - rect.height / 2}px, 0)`;
  }

  onSpotlightLeave(): void {
    const el = document.getElementById('about');
    el?.classList.remove('spot-on');
  }

  trackByName(_: number, item: { name: string }): string {
    return item.name;
  }
}
