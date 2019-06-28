import { NgModule } from '@angular/core';
import {GraficoDonaComponent} from './grafico-dona/grafico-dona.component';
import {IncrementadorComponent} from './incrementador/incrementador.component';
import {InfoCardComponent} from './info-card/info-card.component';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
  declarations: [
    GraficoDonaComponent,
    IncrementadorComponent,
    InfoCardComponent,
    ModalContainerComponent,
  ],
  exports: [
    InfoCardComponent,
    GraficoDonaComponent,
    IncrementadorComponent,
    ModalContainerComponent
  ],
  imports: [
    FormsModule,
    ChartsModule,
    CommonModule
  ]
})
export class ComponentsModule { }
