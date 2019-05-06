import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username: string;
  roles: string[];
  userRol: string;

  constructor( public _sidebarService: SidebarService,
    private _authService: AuthService,
    private router: Router  ) { }

    ngOnInit() {
      this.username = this._authService.getUserName();
      this.userRol = this._authService.getUserRol();
    }
  
    hasPermissions(roles: string[]) {
      return this._authService.hasPermissions(roles, this.userRol);
    }
}
