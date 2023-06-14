import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  usersList: User[] = [];
  selectedUser: User;
  storage: Storage = sessionStorage;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.handleGetAllUsers();
  }

  handleGetAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        console.log(response)
        this.usersList = response;
      },
    );
  }

  updateUser(user: User) {
    this.userService.getUserById(user.id).subscribe(
      (response: User) => {
        this.selectedUser = response;
      }
    )
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(
      (response: any) => {
        console.log(`${user} has been deleted.`)
        this.handleGetAllUsers();
      }
    );
  }

}
