import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isDropdownOpen = false;
  isSidebarOpen = false;

  // User Information
  userName = 'Sanjaya Samudra';
  userEmail = 'sanjayasamudraelpitiya@gmail.com';
  userProfession = 'Undergraduate Software Engineer';

  viewCount: number = 0;

  ngOnInit() {
    // Logic for "never resets zero" view count (stored in localStorage)
    const storedCount = localStorage.getItem('portfolio_view_count');
    let count = 0;
    
    if (storedCount) {
      const parsed = parseInt(storedCount, 10);
      if (!isNaN(parsed)) {
        count = parsed;
      }
    }
    
    // Increment count for this visit
    count++;
    
    localStorage.setItem('portfolio_view_count', count.toString());
    this.viewCount = count;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false; // Close dropdown after clicking a link
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    console.log('Logging out...');
    // Add your logout logic here (clear tokens, redirect to login, etc.)
  }
}
