import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from '../shared/services/drawer.service';
import {environment} from '../../environments/environment';
import {MatDrawer} from '@angular/material/sidenav';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatDrawer;

  constructor(private drawerService: DrawerService) {
  }

  ngOnInit() {
    this.drawerService.toggle.subscribe(
      () => {
        this.sidenav.toggle();
      }
    );
  }
}
