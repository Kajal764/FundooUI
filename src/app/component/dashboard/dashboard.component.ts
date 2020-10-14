import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  isExpanded = true;
  isShowing = false;
  message = 'Fundoo';
  isRefresh = true;
  isGrid = true;
  username = 'kajal waghmare';
  emailId = 'kajalw1998@gmail.com';

  constructor(private router: Router) {
  }

  toggle() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
  }

  refresh() {
    this.isRefresh ? this.isRefresh = false : this.isRefresh = true;
  }

  grid() {
    this.isGrid ? this.isGrid = false : this.isGrid = true;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
