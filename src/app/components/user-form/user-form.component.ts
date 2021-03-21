import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserState } from 'src/app/states/user.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UpdateUser, AddUser, SetSelectedUser } from 'src/app/actions/user.action';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;

    userForm: FormGroup;
    editUser = false;
    private formSubscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private store: Store) {
        this.createForm();
    }

    ngOnInit() {
      this.formSubscription.add(
        this.selectedUser.subscribe(user => {
          if (user) {
            this.userForm.patchValue({
              id: user.id,
              name: user.name,
              city: user.city
            });
            this.editUser = true;
          } else {
            this.editUser = false;
          }
        })
      );
    }

    createForm() {
      this.userForm = this.fb.group({
          id: [''],
          name: [''],
          city: ['']
      });
    }

    onSubmit() {
      if (this.editUser) {
        this.store.dispatch(new UpdateUser(this.userForm.value, this.userForm.value.id));
        this.clearForm();
      } else {
        this.store.dispatch(new AddUser(this.userForm.value));
        this.clearForm();
      }
    }

    clearForm() {
      this.userForm.reset();
      this.store.dispatch(new SetSelectedUser(null));
    }

}
