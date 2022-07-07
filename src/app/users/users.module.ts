import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogOverviewExampleDialog, UsersViewComponent} from './users-view/users-view.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    UsersViewComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ]
})
export class UsersModule { }
