import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-composite-wrapper',
  templateUrl: './composite-wrapper.component.html',
  styleUrls: ['./composite-wrapper.component.scss']
})
export class CompositeWrapperComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}