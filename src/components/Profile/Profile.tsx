import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import classes from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import {ActionType, profilePageType} from "../../redux/state";

export type ProfileType = {
    state: profilePageType
    message: string,
    addPostCallback: (m:string)=> void
    updateYourPostText:(t:string)=> void
    dispatch:(action: ActionType)=> void
}

const Profile = (props: ProfileType) => {

  return (
    <div className={classes.content}>
      <ProfileInfo />
      <MyPosts state={props.state}
               addPostCallback={props.addPostCallback}
               updateYourPostText={props.updateYourPostText}
               message={props.message}
               dispatch={props.dispatch}
      />
    </div>
  )
}
export default Profile;