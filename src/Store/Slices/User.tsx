import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

const initialState = {
    username : "",
    userType : ""
  };
const userSlice= createSlice({
    name : "user",
    initialState: initialState,
    reducers: {
        setUser(state,action){
            console.log(action);
             state.username=action.payload.username;
             state.userType=action.payload.userType;
        }
    }
});

export const userActions=userSlice.actions;
export default userSlice.reducer;