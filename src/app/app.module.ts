import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsModule} from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DepartureboardService } from './_services/departureboard.service';
import { MomentModule } from 'ngx-moment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ButtonsModule.forRoot(),
      AppRoutingModule,
      MomentModule,
   ],
   providers: [
      DepartureboardService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
