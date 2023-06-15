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
  openUser: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.handleGetAllUsers();
  }

  handleGetAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data)
        this.usersList = data;
      },
    );
  }

  updateUser(user: User) {
    this.selectedUser = user;
    this.openModal(user);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next:(response: any) => {
        this.handleDeleteUser(user);
        console.log(response)
        console.log(user)
      }
    });
  }

  handleDeleteUser(user: User) {
    if (this.usersList.length == 1) {
      this.usersList = [];
    } else {
      const index = this.usersList.indexOf(user);
      this.usersList.splice(index, 1);
    }
    alert('User deleted successfully!')
  }

  openModal(user: User) {
    this.openUser = true;
  }

  closeUserModal() {
    this.openUser = false;
  }

}
