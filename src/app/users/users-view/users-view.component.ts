import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {UserType} from "../model/user.model";
import {switchMap} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from "ngx-toastr";


export interface DialogData {
  id: number;
  email: string;
  password: string
}

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'edit', 'delete'];
  dataSource: UserType [] = [];

  constructor(private userService: UsersService, public dialog: MatDialog, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => this.dataSource = users);
  }

  onAdd(email: string, password: string) {
    this.userService.add(email, password)
      .pipe(switchMap(() => this.userService.fetchUsers()))
      .subscribe({
        next: users => this.dataSource = users, error: (error) => {
          console.log(error.error);
          this.toastr.error(error.error)
        }
      });
  }

  onDelete(id: number): void {
    this.userService.delete(id)
      .subscribe({
        complete: () => this.userService.fetchUsers()
          .subscribe(users => this.dataSource = users),
        error: err => {
          this.toastr.error(err.error);
        }
      });
  }

  onEdit(id: number, email: string): void {
    this.openDialog(id, email);
  }

  openDialog(id: number, email: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: {id, email, password: ""},
    });

    dialogRef.afterClosed().subscribe((result?: DialogData) => {
      if (result) {
        this.userService.update(result.id, result.email, result.password)
          .pipe(switchMap(() => this.userService.fetchUsers()))
          .subscribe({
            next: (users) => {
              this.dataSource = users
            }, error: (error) => {
              this.toastr.error(error.error)
            }
          });
      }
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
