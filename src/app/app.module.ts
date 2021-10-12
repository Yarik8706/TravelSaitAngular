import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { UnitComponent } from "./unit.component";
import { FooterComponent } from './footer/footer.component';
import { SendMessageUsComponent } from './send-message-us/send-message-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NewsComponent } from './news/news.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {FlashMessagesModule} from "angular2-flash-messages";
import { AboutUsComponent } from './about-us/about-us.component';
import { Slider2Component } from './slider2/slider2.component';
import {TourService} from "./services/tour.service";
import { TourComponent } from './tour/tour.component';
import {NewsService} from "./services/news.service";
import { CardTourComponent } from './card-tour/card-tour.component';
import { CardsNewsComponent } from './cards-news/cards-news.component';
import { CardNewsComponent } from './card-news/card-news.component';
import { CardsTourComponent } from './cards-tour/cards-tour.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'news', component: NewsComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'tour', redirectTo: '' },
  {
    path: 'tour',
    children: [{
      path: '**',
      component: TourComponent
    }]
  },
  { path: '**', redirectTo: '' }
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    UnitComponent,
    FooterComponent,
    SendMessageUsComponent,
    ContactsComponent,
    NewsComponent,
    AdminPanelComponent,
    AboutUsComponent,
    Slider2Component,
    TourComponent,
    CardTourComponent,
    CardsNewsComponent,
    CardNewsComponent,
    CardsTourComponent
  ],
  imports: [
    BootstrapIconsModule.pick(allIcons),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    TourService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
