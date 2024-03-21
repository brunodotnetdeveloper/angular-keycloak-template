import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  agentProfile: any = {};

  authenticated = false;
  isUser = false;
  isAdmin = false;

  constructor(private readonly keycloak: KeycloakService) {
    this.keycloak.isLoggedIn().then((authenticated) => {
      this.authenticated = authenticated;
      if (authenticated) {
        const roles = this.keycloak.getUserRoles();
        this.isUser = roles.includes('USER');
        this.isAdmin = roles.includes('ADMIN');
      }
    });
  }
  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(user => {
      this.agentProfile = user;
    })
  }
  // login() {
  //   this.keycloak.login();
  // }

  logout() {
    this.keycloak.logout();
  }
}
