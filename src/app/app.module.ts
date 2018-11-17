import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, DateAdapter, MAT_DATE_FORMATS, MatCardModule,
} from '@angular/material';
import {DataService} from './services/data.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MyDateAdapter, MY_DATE_FORMATS} from './dateAdapter/dateAdapter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { dateFormatPipe } from './date.pipe';
import { LoginComponent } from './login/login.component';
import { RootComponent } from './root/root.component';
import {Routes,RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes:Routes =[
{path:'',component: LoginComponent},
{path:'data',component: AppComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    dateFormatPipe,
    LoginComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    DataService,
      {provide: DateAdapter, useClass: MyDateAdapter},
      {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
