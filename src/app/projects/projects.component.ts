import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

interface Project {
  name: string;
  image: string;
  year: number;
  description: string;
  link: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scene', { static: true }) sceneRef!: ElementRef<HTMLElement>;

  // Reference to video for speed control
  @ViewChild('bgVideo') bgVideoRef!: ElementRef<HTMLVideoElement>;

  activeProjectIndex = 0;
  isMobile = false;
  isPlaying = true;
  interval: any;

  // Custom Dropdown State
  isDropdownOpen = false;

  // View Settings
  tiltX = 0;
  yOffset = 0;

  // Enables jump-to-any via shortest-path rotation
  rotationDeg = 0;

  // Drag rotate state
  private isDragging = false;
  private dragStartX = 0;
  private dragStartRotation = 0;
  private dragPointerId: number | null = null;

  projects: Project[] = [
    {
      name: 'Country Info',
      image: 'country.png',
      year: 2024,
      description: 'Search for countries.',
      link: 'https://sanjayasamudra.github.io/First-JavaScript-Website/',
      technologies: ['HTML', 'CSS', 'JavaScript', 'REST API']
    },
    {
      name: 'Hospital Management System',
      image: 'hospital-management-system.png',
      year: 2024,
      description: 'Manage your healthcare facility.',
      link: 'https://github.com/Sanjaya-Samudra/Hospital-Management-System',
      technologies: ['Java', 'MySQL']
    },
    {
      name: 'Customer CMS',
      image: 'customer.png',
      year: 2024,
      description: 'Manage customer data.',
      link: 'https://github.com/Sanjaya-Samudra/Java-Swing-Practice-Project-1',
      technologies: ['Java', 'Swing', 'MySQL']
    },
    {
      name: 'Item Management',
      image: 'item.png',
      year: 2024,
      description: 'Inventory control.',
      link: 'https://github.com/Sanjaya-Samudra/JavaFX-Maven-Practice-Project-2',
      technologies: ['Java', 'JavaFX', 'Maven']
    },
    {
      name: 'MosBurger',
      image: 'mos-burger.png',
      year: 2024,
      description: 'My burger shop',
      link: 'https://github.com/Sanjaya-Samudra/MosBurger',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Fruitopia',
      image: 'fruitopia.png',
      year: 2025,
      description: 'Fruit details.',
      link: 'https://github.com/Sanjaya-Samudra/Fruitopia',
      technologies: ['React', 'next', 'JavaScript']
    },
    {
      name: 'Customer App',
      image: 'customer-manage.png',
      year: 2024,
      description: 'JavaFX customer system.',
      link: 'https://github.com/Sanjaya-Samudra/JavaFX-Maven-Practice-Project-1',
      technologies: ['Java', 'JavaFX', 'Maven']
    },
    {
      name: 'Shopping Site',
      image: 'shopping.png',
      year: 2024,
      description: 'Shopping website.',
      link: 'https://github.com/Sanjaya-Samudra/Java-SpringBoot-Practice-Project-1',
      technologies: ['Java', 'Spring Boot', 'MySQL']
    },
    {
      name: 'Doc2Voice',
      image: 'doc2voice.png',
      year: 2025,
      description: 'Document to speech converter.',
      link: 'https://github.com/Sanjaya-Samudra/Doc2Voice',
      technologies: ['React', 'Next.js', 'Tailwind', 'TypeScript']
    },
    {
      name: 'Clothify',
      image: 'clothify.png',
      year: 2025,
      description: 'My JavaFX clothing store.',
      link: 'https://github.com/Sanjaya-Samudra/JavaFX-Clothify-Store',
      technologies: ['JavaFX', 'CSS']
    }
  ];

  ngOnInit() {
    this.checkScreenSize();
    this.rotationDeg = this.targetDegForIndex(this.activeProjectIndex);
    this.startAutoRotate();
  }

  // Set video speed here to 0.5 (Half Speed)
  ngAfterViewInit() {
    if (this.bgVideoRef?.nativeElement) {
      this.bgVideoRef.nativeElement.playbackRate = 0.5;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  // Close dropdown if clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.jump-container')) {
      this.isDropdownOpen = false;
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.updateLayoutVars();
  }

  updateLayoutVars() {
    if (this.isMobile) {
      this.tiltX = -5;
      this.yOffset = -40;
    } else {
      this.tiltX = -6;
      this.yOffset = 20;
    }
  }

  // ========= Autoplay =========
  startAutoRotate() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.isPlaying && !this.isDragging && !this.isDropdownOpen) {
        this.rotate('next');
      }
    }, 3000);
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
    if (!this.isPlaying) clearInterval(this.interval);
    else this.startAutoRotate();
  }

  // ========= Jump helpers =========
  private anglePerCard(): number {
    return 360 / this.projects.length;
  }

  private targetDegForIndex(index: number): number {
    return -(index * this.anglePerCard());
  }

  private shortestDelta(from: number, to: number): number {
    let d = (to - from) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  private indexFromRotation(): number {
    const angle = this.anglePerCard();
    const rawIndex = Math.round((-this.rotationDeg) / angle);
    return ((rawIndex % this.projects.length) + this.projects.length) % this.projects.length;
  }

  private snapToNearest(): void {
    this.goTo(this.indexFromRotation());
  }

  // ========= Public navigation =========
  rotate(direction: 'next' | 'prev') {
    const angle = this.anglePerCard();

    if (direction === 'next') {
      this.activeProjectIndex = (this.activeProjectIndex + 1) % this.projects.length;
      this.rotationDeg -= angle;
    } else {
      this.activeProjectIndex = (this.activeProjectIndex - 1 + this.projects.length) % this.projects.length;
      this.rotationDeg += angle;
    }
  }

  bringToFront(index: number) {
    if (this.isDragging) return;
    this.goTo(index);
  }

  goTo(index: number) {
    const target = this.targetDegForIndex(index);
    const delta = this.shortestDelta(this.rotationDeg, target);
    this.rotationDeg = this.rotationDeg + delta;
    this.activeProjectIndex = index;
  }

  // ========= Custom Dropdown Logic =========
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectJump(index: number) {
    this.goTo(index);
    this.isDropdownOpen = false;
  }

  getContainerTransform(): string {
    return `translateY(${this.yOffset}px) rotateX(${this.tiltX}deg) rotateY(${this.rotationDeg}deg)`;
  }

  getTransform(index: number): string {
    const theta = 360 / this.projects.length;
    const effectiveWidth = this.isMobile ? 160 : 260;
    const multiplier = this.isMobile ? 1.45 : 1.3;

    const radius = Math.round((effectiveWidth / 2) / Math.tan(Math.PI / this.projects.length)) * multiplier;
    return `rotateY(${theta * index}deg) translateZ(${radius}px)`;
  }

  getBlur(index: number): number {
    let diff = Math.abs(index - this.activeProjectIndex);
    const total = this.projects.length;
    if (diff > total / 2) diff = total - diff;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    return 3;
  }

  getIcon(tech: string): string {
    const iconMap: { [key: string]: string } = {
      'HTML': 'html.svg',
      'CSS': 'css.svg',
      'JavaScript': 'javascript.svg',
      'Java': 'java.svg',
      'MySQL': 'mysql.svg',
      'Swing': 'java.svg',
      'JavaFX': 'java.svg',
      'Maven': 'java.svg',
      'Spring Boot': 'spring-boot.svg',
      'REST API': 'postman.svg',
      'React': 'react.svg',
      'Next.js': 'nextjs.svg',
      'Tailwind': 'tailwind.svg',
      'TypeScript': 'typescript.svg'
    };
    return iconMap[tech] || 'java.svg';
  }

  // ========= Drag rotate (mouse + touch) =========
  onDragStart(e: PointerEvent) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('a,button,.custom-options-list')) return; // Allow links and dropdowns
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    this.isDragging = true;
    this.dragPointerId = e.pointerId;
    this.dragStartX = e.clientX;
    this.dragStartRotation = this.rotationDeg;

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  onDragMove(e: PointerEvent) {
    if (!this.isDragging || this.dragPointerId !== e.pointerId) return;

    const dx = e.clientX - this.dragStartX;
    if (Math.abs(dx) > 5) {
      // Dragging confirmed
    }

    const sensitivity = this.isMobile ? 0.22 : 0.18;
    this.rotationDeg = this.dragStartRotation + (dx * sensitivity);
  }

  onDragEnd(e?: PointerEvent) {
    if (!this.isDragging) return;
    if (e && this.dragPointerId !== e.pointerId) return;

    setTimeout(() => {
      this.isDragging = false;
    }, 50);

    this.dragPointerId = null;
    this.snapToNearest();
  }

  // ========= Background parallax =========
  onScenePointerMove(e: MouseEvent) {
    const el = this.sceneRef?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    const px = Math.max(-1, Math.min(1, nx));
    const py = Math.max(-1, Math.min(1, ny));

    el.style.setProperty('--px', String(px.toFixed(3)));
    el.style.setProperty('--py', String(py.toFixed(3)));

    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${mx.toFixed(2)}%`);
    el.style.setProperty('--my', `${my.toFixed(2)}%`);
  }

  onSceneTouchMove(e: TouchEvent) {
    if (!e.touches?.length) return;
    const t = e.touches[0];
    this.onScenePointerMove({ clientX: t.clientX, clientY: t.clientY } as any);
  }

  onScenePointerLeave() {
    const el = this.sceneRef?.nativeElement;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '40%');
  }
}