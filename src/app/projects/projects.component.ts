import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  showProjects: boolean = false;

  // Projects with loading state
  projects = [
    {
      name: 'Country Info',
      description: 'Users can search for a country and view details such as the country\'s name, capital, population, region, and flag.',
      image: 'country.png',  // Corrected image URL
      link: 'https://sanjayasamudra.github.io/First-JavaScript-Website/',
      year: 2024,
      completion: 100,  // Completion percentage (0-100)
    },
    {
      name: 'Hospital Management System Application',
      description: 'This comprehensive system facilitates easy management of patient records, appointments, billing, and staff, all through a user-friendly interface.',
      image: 'hospital.png',  // Replace with actual image URL
      link: 'https://github.com/Sanjaya-Samudra/Hospital-Management-System',
      year: 2024,
      completion: 95,
    },
    {
      name: 'Customer Management System Application',
      description: 'Efficiently manage customer data with full CRUD functionality for streamlined operations. Design with java swing',
      image: 'customer.png',  // Replace with actual image URL
      link: 'https://github.com/Sanjaya-Samudra/Java-Swing-Practice-Project-1',
      year: 2024,
      completion: 100,
    },
    {
      name: 'Item Management System Application',
      description: 'Item Management System: A comprehensive solution for managing and tracking items, allowing users to easily create, read, update, and delete entries for efficient inventory control.',
      image: 'item.png',  // Replace with actual image URL
      link: 'https://github.com/Sanjaya-Samudra/JavaFX-Maven-Practice-Project-2',
      year: 2024,
      completion: 100,
    },
    {
      name: 'Burger Shop',
      description: 'Welcome to our Burger Shop! Enjoy fresh, customizable burgers made just the way you like. Fast, simple, and delicious—order your perfect burger now!',
      image: 'burger-shop.png',  // Replace with actual image URL
      link: 'https://example.com/project2',
      year: 2024,
      completion: 70,
    },
    {
      name: 'My Fruit Collection',
      description: 'Discover a world of fruits! Explore detailed information about various fruits, their benefits, and interesting facts to enhance your knowledge and appreciation of nature\'s bounty.',
      image: 'fruit.png',  // Replace with actual image URL
      link: 'https://sanjayasamudra.github.io/First-Website/',
      year: 2024,
      completion: 60,
    },
    {
      name: 'Customer Management Application',
      description: 'A JavaFX-based system designed for adding and viewing customer details, with a user-friendly interface. Currently under development, it aims to simplify customer data management.',
      image: 'customer-manage.png',  // Replace with actual image URL
      link: 'https://github.com/Sanjaya-Samudra/JavaFX-Maven-Practice-Project-1',
      year: 2024,
      completion: 50,
    },
    {
      name: 'Shoping Site',
      description: 'I created a simple shopping website that is currently under development. It aims to provide a user-friendly platform for browsing and purchasing products, with plans for enhanced features in the future.',
      image: 'shopping.png',  // Replace with actual image URL
      link: 'https://github.com/Sanjaya-Samudra/Java-SpringBoot-Practice-Project-1',
      year: 2024,
      completion: 30,
    }
  ];
}
