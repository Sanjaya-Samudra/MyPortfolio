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
      title: 'AI Agents for Beginners',
      subtitle: 'Simplilearn SkillUp',
      date: 'Oct 2025',
      description: 'Completed an online certification focused on the fundamentals of AI agents, covering core concepts, practical use cases, and foundational skills for building and understanding intelligent agent-based systems.',
      imageUrl: 'ai-agents-simplilearn.PNG',
    },
    {
      id: 2,
      title: 'Canva for Beginners',
      subtitle: 'Simplilearn SkillUp',
      date: 'Oct 2025',
      description: 'Completed a beginner-level certification covering the fundamentals of Canva, including design principles, layouts, typography, and creating professional visuals for digital and social media use.',
      imageUrl: 'canva-simplilearn.PNG',
    },
    {
      id: 3,
      title: 'Introduction to PHP',
      subtitle: 'Alison',
      date: 'Aug 2025',
      description: 'Completed a foundational course in PHP programming, covering core concepts such as PHP syntax, variables, control structures, and basic web application logic. Achieved a 100% final assessment score, demonstrating strong understanding of introductory PHP concepts.',
      imageUrl: 'php-alison.png',
    },
    {
      id: 4,
      title: 'Java (Basic) Certification',
      subtitle: 'HackerRank',
      date: 'May 2025',
      description: 'Earned a certification validating fundamental Java programming skills. Demonstrates understanding of basic syntax, data types, control flow, object-oriented concepts, and problem-solving through the HackerRank skill certification assessment.',
      imageUrl: 'java-hackerrank.png',
    },
    {
      id: 5,
      title: 'SQL (Basic) Certification',
      subtitle: 'HackerRank',
      date: 'Apr 2025',
      description: 'Earned a certification validating fundamental SQL skills, including querying databases using SELECT statements, filtering with WHERE clauses, sorting results, and performing basic aggregations. Demonstrates ability to work with relational databases and structured data.',
      imageUrl: 'sql-hackerrank.png',
    },
    {
      id: 6,
      title: 'Python Certification',
      subtitle: 'University of Moratuwa',
      date: 'Dec 2024',
      description: 'Earned a certification demonstrating solid understanding and hands-on experience with Python data structures and algorithms. Covered lists, dictionaries, sets, tuples, and complexity analysis.',
      imageUrl: 'python-uom.PNG',
    },
    {
      id: 7,
      title: 'Basics of WordPress',
      subtitle: 'CMS Fundamentals',
      date: 'Nov 2024',
      description: 'The WordPress Basics course teaches you how to create, manage, and customize websites with themes, plugins, and content.',
      imageUrl: 'wordpress1.png',
    },
    {
      id: 8,
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