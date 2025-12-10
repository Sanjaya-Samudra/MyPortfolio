import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isDropdownOpen = false;
  isSidebarOpen = false;

  // User Information
  userName = 'Sanjaya Samudra';
  userEmail = 'sanjayasamudraelpitiya@gmail.com';
  userProfession = 'Undergraduate Software Engineer';

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
