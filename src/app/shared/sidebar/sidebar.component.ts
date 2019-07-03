import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    public _authService: AuthService,
    private translate: TranslateService) { }

    ngOnInit() {
      this.username = this._authService.getUserName();
      this.userRol = this._authService.getUserRol();
    }
  
    hasPermissions(roles: string[]) {
      return this._authService.hasPermissions(roles, this.userRol);
    }

    getRolName() {
      let rolName = '';
      this.translate.get('roles.' + this.userRol)
      .subscribe((value: any) => rolName = value);
      return rolName;
    }
}
