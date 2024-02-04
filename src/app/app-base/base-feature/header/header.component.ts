import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() isMenuOpen = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  toggleMenu(): void {
    this.menuStatus = !this.menuStatus;
    this.isMenuOpen.emit(this.menuStatus);
  }
}
