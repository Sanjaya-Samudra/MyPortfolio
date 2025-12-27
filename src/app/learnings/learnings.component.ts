import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learnings.component.html',
  styleUrl: './learnings.component.css'
})
export class LearningsComponent {
  selectedItem: any;
  searchQuery: string = '';
  isModalOpen: boolean = false;

  learnings = [
    {
      id: 1,
      title: 'Python Certification',
      subtitle: 'University of Moratuwa',
      date: 'Dec 2024',
      description: 'Earned a certification demonstrating solid understanding and hands-on experience with Python data structures and algorithms. Covered lists, dictionaries, sets, tuples, and complexity analysis.',
      imageUrl: 'python-uom.PNG', 
    },
    {
      id: 2,
      title: 'Basics of WordPress',
      subtitle: 'CMS Fundamentals',
      date: 'Nov 2024',
      description: 'The WordPress Basics course teaches you how to create, manage, and customize websites with themes, plugins, and content.',
      imageUrl: 'wordpress1.png',
    },
    {
      id: 3,
      title: 'Build a Complete Website',
      subtitle: 'Full Stack WordPress',
      date: 'Oct 2024',
      description: 'Create a fully functional website, from setup to launch, including customization, design, and adding essential features.',
      imageUrl: 'wordpress2.png',
    }
  ];

  resources = [
    { 
        title: 'Coursera', 
        description: 'Professional Certifications', 
        link: 'https://www.coursera.org/', 
        icon: 'C',
        color: 'bg-blue-600' 
    },
    { 
        title: 'freeCodeCamp', 
        description: 'Full Stack Practice', 
        link: 'https://www.freecodecamp.org/', 
        icon: 'F',
        color: 'bg-gray-700' 
    },
    { 
        title: 'Udemy', 
        description: 'Specialized Courses', 
        link: 'https://www.udemy.com/', 
        icon: 'U',
        color: 'bg-purple-600' 
    }
  ];

  constructor() {
    // Default selection for desktop view
    this.selectedItem = this.learnings[0];
  }

  get filteredLearnings() {
    if (!this.searchQuery) return this.learnings;
    return this.learnings.filter(item => 
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      item.subtitle.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Desktop selection
  selectItem(item: any) {
    this.selectedItem = item;
  }

  // Modal logic
  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}