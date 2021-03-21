import { User } from '../models/user';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AddUser, UpdateUser, DeleteUser, SetSelectedUser } from '../actions/user.action';
import { Injectable } from '@angular/core';

export class UserStateModel {
    Users: User[];
    selectedUser: User;
}

@State<UserStateModel>({
    name: 'Users',
    defaults: {
        Users: [],
        selectedUser: null
    }
})

@Injectable()
export class UserState {

    constructor() {
    }

    @Selector()
    static getUserList(state: UserStateModel) {
        return state.Users;
    }

    @Selector()
    static getSelectedUser(state: UserStateModel) {
        return state.selectedUser;
    }

    @Action(AddUser)
    addUser({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
        const state = getState();
        const UserList = [...state.Users];
        payload.id = UserList.length + 1;
        patchState({
            Users: [...state.Users, payload]
        });
        return;
    }

    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<UserStateModel>, {payload, id}: UpdateUser) {
        const state = getState();
        const UserList = [...state.Users];
        const UserIndex = UserList.findIndex(item => item.id === id);
        UserList[UserIndex] = payload;
        setState({
            ...state,
            Users: UserList,
        });
        return;
    }


    @Action(DeleteUser)
    deleteUser({getState, setState}: StateContext<UserStateModel>, {id}: DeleteUser) {
        const state = getState();
        const filteredArray = state.Users.filter(item => item.id !== id);
        setState({
            ...state,
            Users: filteredArray,
        });
        return;
    }

    @Action(SetSelectedUser)
    setSelectedUserId({getState, setState}: StateContext<UserStateModel>, {payload}: SetSelectedUser) {
        const state = getState();
        setState({
            ...state,
            selectedUser: payload
        });
        return;
    }
}