import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
  }

  createBuyOrSale(isBuy?: boolean) {
    if (isBuy) {
      this.router.navigate(['/operacion'], {queryParams: {buy: true}, skipLocationChange: true});
    } else {
      this.router.navigate(['/operacion'], {queryParams: {sale: true}, skipLocationChange: true});
    }
  }
}
