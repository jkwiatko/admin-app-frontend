import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {UserType} from "../model/user.model";

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  public users: UserType[] = [];

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => this.users = users);
  }

}
