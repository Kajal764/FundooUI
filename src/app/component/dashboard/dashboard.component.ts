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

  toggle(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.isRefresh ? this.isRefresh = false : this.isRefresh = true;
  }

  grid(): void {
    this.isGrid ? this.isGrid = false : this.isGrid = true;
  }

  mouseenter(): void {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave(): void {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
