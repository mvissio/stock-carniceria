import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../services/pages/home.service';
import {DataInfoContentInterface} from '../../interfaces/models.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  dataInfoList: DataInfoContentInterface[] = [];

  constructor(private _home: HomeService) {
  }

  ngOnInit() {
    this._home.getCommonsInfo().subscribe(resp => this.dataInfoList = resp);
  }

}
