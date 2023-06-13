import { Component, ViewChild } from '@angular/core';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  items = [
    { name: 'John Doe', timestamp: '2023-06-12', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', imageUrl: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg' },
    { name: 'Jane Smith', timestamp: '2023-06-11', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', imageUrl: 'https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg' },
  ];

  openUser: boolean = false;

  openUserModal() {
    this.openUser = true;
  }

  closeUserModal(): void {
    this.openUser = false;
  }

  openPost: boolean = false;

  openPostModal() {
    this.openPost = true;
  }

  closePostModal(): void {
    this.openPost = false;
  }
}
