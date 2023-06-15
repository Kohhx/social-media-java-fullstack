import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  // For searchbar in manage users page:
  private _searchTerm: string = '';
  filteredUsersList: User[] = [];

  // For pagination:
  page: number = 1;
  usersPerPage: number = 10;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.handleGetAllUsers();
  }

  handleGetAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data)
        this.usersList = data;
        this.filteredUsersList = data;
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
    this.toastr.success('User deleted successfully!')
  }

  openModal(user: User) {
    this.openUser = true;
  }

  closeUserModal() {
    this.openUser = false;
  }

  // For searchbar in manage users page:
  filterUsers() {
    this.filteredUsersList = this.usersList.filter((user: User) => {
    // Add filers for id / name / email:
      return user.id.toString().includes(this.searchTerm) ||
      (user.firstName ? user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) : false) ||
      (user.lastName ? user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) : false) ||
      (user.email ? user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) : false)
    });
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterUsers();
  }

}
