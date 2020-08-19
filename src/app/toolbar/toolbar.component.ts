import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {DrawerService} from '../shared/services/drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(private authService: AuthService, private drawerService: DrawerService) {
  }

  ngOnInit() {
  }

  onSignOut() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onMenuToggle() {
    this.drawerService.toggle.emit();
  }

}
