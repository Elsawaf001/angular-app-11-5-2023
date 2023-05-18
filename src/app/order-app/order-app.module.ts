import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivityService} from "./service/activity.service";
import {IndustrialOrderService} from "./service/industrial-order.service";
import {LicenceAreaService} from "./service/licence-area.service";
import {OrderSubscriberService} from "./service/order-subscriber.service";
import {RealStateOrderService} from "./service/real-state-order.service";
import {OrderSubscriberComponent} from "./components/order-subscriber/order-subscriber.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IndustrialOrderComponent} from "./components/industrial-order/industrial-order.component";
import {ActivityComponent} from "./components/activity/activity.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [OrderSubscriberComponent,IndustrialOrderComponent,ActivityComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [ActivityService, IndustrialOrderService
    , LicenceAreaService, OrderSubscriberService, RealStateOrderService]
})
export class OrderAppModule {
}
