import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  items = [
    { name: 'John Doe', timestamp: '2023-06-12', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', imageUrl: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg' },
    { name: 'Jane Smith', timestamp: '2023-06-11', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', imageUrl: 'https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg' },
  ];
}
