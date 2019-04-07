import {Component, Input, OnInit} from '@angular/core';
import {DataInfoContentInterface} from '../../interfaces/models.interface';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() dataObjectList: DataInfoContentInterface[];
  @Input() cardColor: 'lightgray';
  constructor() { }

  ngOnInit() {
  }

}
