import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() menuClick = new EventEmitter<string>();
  selectedTab: string = 'basic-details'; 
  selectComponent(componentName: string) {
    this.selectedTab = componentName;
    this.menuClick.emit(componentName);
  }
}
