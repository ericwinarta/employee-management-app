import { Component } from '@angular/core';
import { HeaderComponent } from './base-feature/header/header.component';
import { SidebarComponent } from './base-feature/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './app-base.component.html',
  styleUrl: './app-base.component.css'
})
export class AppBaseComponent {
  sidebarStatus: boolean = false;

}
