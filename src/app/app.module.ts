import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { SidenavComponent } from './component/layout/sidenav/sidenav/sidenav.component';
import { LoginComponent } from './component/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CategoriesComponent } from './component/admin/categories/categories.component';
import { FeaturedcategoriesComponent } from './component/admin/featuredcategories/featuredcategories.component';
import { EditionsComponent } from './component/admin/editions/editions.component';
import { CategoryDialogComponent } from './component/admin/categories/newcategory/category-dialog.component';
import { NeweditionComponent } from './component/admin/editions/newedition/newedition.component';
import { EditeditionComponent } from './component/admin/editions/editedition/editedition.component';
import { EditcategoryComponent } from './component/admin/categories/editcategory/editcategory.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BhubaneswarPaperComponent } from './component/bhubaneswar-paper/bhubaneswar-paper.component';
import { UploadPagesComponent } from './component/admin/editions/upload-pages/upload-pages.component';
import { EditPagesComponent } from './component/admin/editions/upload-pages/edit-pages/edit-pages.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SidenavComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    EditcategoryComponent,
    FeaturedcategoriesComponent,
    EditionsComponent,
    NeweditionComponent,
    EditeditionComponent,
    BhubaneswarPaperComponent,
    UploadPagesComponent,
    EditPagesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
