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
import { AddtohomeeditionComponent } from './component/admin/editions/addtohomeedition/addtohomeedition.component';
import { FeaturededitionComponent } from './component/admin/featurededition/featurededition.component';
import { ViewusersComponent } from './component/admin/users/viewusers/viewusers.component';
import { NewuserComponent } from './component/admin/users/newuser/newuser.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ManageHeaderComponent } from './component/admin/manage-header/manage-header.component';

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
    AddtohomeeditionComponent,
    FeaturededitionComponent,
    ViewusersComponent,
    NewuserComponent,
    ManageHeaderComponent
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
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
