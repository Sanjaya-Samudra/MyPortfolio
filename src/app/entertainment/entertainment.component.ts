import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-entertainment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entertainment.component.html',
  styleUrl: './entertainment.component.css'
})
export class EntertainmentComponent {
  categories: string[] = ['Games', 'Videos', 'Editing', 'Software'];
  items = [
    { title: 'Game Development', description: 'Built a simple black jack game.', category: 'Games', image: 'game.png' },
    { title: 'Video Editing', description: 'Created cinematic edits with Wondershare.', category: 'Videos', image: 'video-editing.png' },
    { title: '3D Modeling', description: 'Modeled in Blender.', category: 'Editing', image: '3D-Dornut.png' },
    { title: 'Software Dev', description: 'Built a streaming app.', category: 'Software', image: 'software.png' },
    { title: 'Music Production', description: 'Produced an EDM track.', category: 'Editing', image: 'music.png' },
    { title: 'Photography', description: 'Image edited with photoshop.', category: 'Editing', image: 'image-editing.png' }
  ];

  filteredItems = [...this.items];

  filterCategory(category: string) {
    this.filteredItems = this.items.filter(item => item.category === category);
  }

}
