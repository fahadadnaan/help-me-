import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireStorageModule } from 'angularfire2/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DetailsComponent } from './details/details.component';
import { AddillnessComponent } from './addillness/addillness.component';
import { AllillnessesComponent } from './allillnesses/allillnesses.component';
import { MyillnessComponent } from './myillness/myillness.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { FooterComponent } from './footer/footer.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { CallusComponent } from './callus/callus.component';
import { WrongeWayComponent } from './wronge-way/wronge-way.component';
import {GetAllDataService} from './services/get-all-data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home' ,  component: HomeComponent },
  { path: 'addillness' ,  component: AddillnessComponent },
  { path: 'allillnesses' ,  component: AllillnessesComponent },
  { path: 'details/:id' ,  component: DetailsComponent },
  { path: 'myillness' ,  component: MyillnessComponent },
  { path: 'userprofile' ,  component: UserprofileComponent },
  { path: 'callus' ,  component: CallusComponent },
  { path: 'search' ,  component: SearchComponent },
  { path: '**', component: WrongeWayComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    AddillnessComponent,
    AllillnessesComponent,
    MyillnessComponent,
    UserprofileComponent,
    FooterComponent,
    ContactsectionComponent,
    CallusComponent,
    WrongeWayComponent,
    SearchComponent
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [
    GetAllDataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
