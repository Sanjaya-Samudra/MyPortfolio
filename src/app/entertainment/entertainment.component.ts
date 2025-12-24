import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

type Category = 'Games' | 'Videos' | 'Editing' | 'Software';

interface ShowcaseItem {
  id: string;
  category: Category;
  title: string;
  images: string[];
  tags: string[];
}

@Component({
  selector: 'app-entertainment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css'],
})
export class EntertainmentComponent implements OnInit, OnDestroy {
  categories: Category[] = ['Games', 'Videos', 'Editing', 'Software'];
  selectedCategory: Category = 'Games';

  items: ShowcaseItem[] = [
    {
      id: 'g_blackjack',
      category: 'Games',
      title: 'Blackjack Build',
      images: ['game.png'],
      tags: ['Logic', 'States', 'UI']
    },
    {
      id: 'v_cine',
      category: 'Videos',
      title: 'Cinematic Edit Pack',
      images: ['video-editing.png'],
      tags: ['Cuts', 'Sound', 'Color']    },
    {
      id: 'e_blender',
      category: 'Editing',
      title: 'Blender 3D Study',
      images: ['3D-Dornut.png'],
      tags: ['Blender', 'Render', 'Materials']
    },
    {
      id: 's_app',
      category: 'Software',
      title: 'Software App Build',
      images: ['software.png'],
      tags: ['Angular', 'Components', 'UX'],
    },
    {
      id: 'e_photo',
      category: 'Editing',
      title: 'Photo Retouch',
      images: ['image-editing.png'],
      tags: ['Photoshop', 'Light', 'Color']
    }
  ];

  activeIndex = 0;

  private startX: number | null = null;
  private startT: number | null = null;

  // Modal
  modalOpen = false;
  modalItem: ShowcaseItem | null = null;
  modalImageIndex = 0;

  // Auto-cycling preview (only active slide)
  private previewIndexById = new Map<string, number>();
  private previewFadingById = new Map<string, boolean>();
  private previewTimer: number | null = null;

  get filteredItems(): ShowcaseItem[] {
    return this.items.filter((i) => i.category === this.selectedCategory);
  }

  ngOnInit(): void {
    this.previewTimer = window.setInterval(() => {
      if (this.modalOpen) return;
      const list = this.filteredItems;
      if (!list.length) return;

      const item = list[this.activeIndex];
      if (!item?.images || item.images.length <= 1) return;

      this.swapPreviewImage(item);
    }, 2600);
  }

  ngOnDestroy(): void {
    if (this.previewTimer) window.clearInterval(this.previewTimer);
    this.previewTimer = null;
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.activeIndex = 0;
  }

  prev(): void {
    const len = this.filteredItems.length;
    if (!len) return;
    this.activeIndex = (this.activeIndex - 1 + len) % len;
  }

  next(): void {
    const len = this.filteredItems.length;
    if (!len) return;
    this.activeIndex = (this.activeIndex + 1) % len;
  }

  goTo(i: number): void {
    const len = this.filteredItems.length;
    if (!len) return;
    this.activeIndex = Math.max(0, Math.min(i, len - 1));
  }

  trackById(_: number, item: ShowcaseItem): string {
    return item.id;
  }

  trackStyle(): Record<string, string> {
    return { transform: `translateX(-${this.activeIndex * 100}%)` };
  }

  // public/ root: "x.png" -> "/x.png"
  imgSrc(p: string): string {
    if (!p) return p;
    if (p.startsWith('http') || p.startsWith('data:') || p.startsWith('/')) return p;
    return `/${p}`;
  }

  getPreviewIndex(item: ShowcaseItem): number {
    return this.previewIndexById.get(item.id) ?? 0;
  }

  isPreviewFading(item: ShowcaseItem): boolean {
    return this.previewFadingById.get(item.id) ?? false;
  }

  private swapPreviewImage(item: ShowcaseItem): void {
    const current = this.getPreviewIndex(item);
    const next = (current + 1) % item.images.length;

    const pre = new Image();
    pre.src = this.imgSrc(item.images[next]);

    this.previewFadingById.set(item.id, true);

    window.setTimeout(() => {
      this.previewIndexById.set(item.id, next);
    }, 160);

    window.setTimeout(() => {
      this.previewFadingById.set(item.id, false);
    }, 420);
  }

  onPointerDown(ev: PointerEvent): void {
    this.startX = ev.clientX;
    this.startT = Date.now();
  }

  onPointerUp(ev: PointerEvent): void {
    if (this.startX === null || this.startT === null) return;
    const dx = ev.clientX - this.startX;
    const dt = Date.now() - this.startT;
    this.startX = null;
    this.startT = null;

    const minDistance = 45;
    const maxTime = 650;
    if (Math.abs(dx) >= minDistance && dt <= maxTime) {
      dx > 0 ? this.prev() : this.next();
    }
  }

  openModal(item: ShowcaseItem, startIndex = 0): void {
    this.modalItem = item;
    this.modalImageIndex = Math.max(0, Math.min(startIndex, item.images.length - 1));
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.modalItem = null;
    document.body.style.overflow = '';
  }

  modalPrev(): void {
    if (!this.modalItem) return;
    const len = this.modalItem.images.length;
    this.modalImageIndex = (this.modalImageIndex - 1 + len) % len;
  }

  modalNext(): void {
    if (!this.modalItem) return;
    const len = this.modalItem.images.length;
    this.modalImageIndex = (this.modalImageIndex + 1) % len;
  }

  selectModalImage(i: number): void {
    if (!this.modalItem) return;
    this.modalImageIndex = Math.max(0, Math.min(i, this.modalItem.images.length - 1));
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {
    if (this.modalOpen) {
      if (ev.key === 'Escape') this.closeModal();
      if (ev.key === 'ArrowLeft') this.modalPrev();
      if (ev.key === 'ArrowRight') this.modalNext();
      return;
    }

    const tag = (ev.target as HTMLElement)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (ev.key === 'ArrowLeft') this.prev();
    if (ev.key === 'ArrowRight') this.next();
  }
}
