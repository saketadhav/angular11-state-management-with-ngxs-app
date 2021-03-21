import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/app/states/user.state';
import { DeleteUser, SetSelectedUser } from 'src/app/actions/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Select(UserState.getUserList) users: Observable<User[]>;

  constructor(private store: Store) {
  }

  ngOnInit() { }

  deleteUser(id: number) {
    this.store.dispatch(new DeleteUser(id));
  }

  editUser(payload: User) {
    this.store.dispatch(new SetSelectedUser(payload));
  }


}
