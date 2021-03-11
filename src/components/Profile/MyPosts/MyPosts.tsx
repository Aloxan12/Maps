import React, {ChangeEvent} from 'react';
import classes from "./MyPosts.module.css"
import Post from './Post';
import {ActionType, addPostActionCreate, changeNewTextCreate, profilePageType} from "../../../redux/state";

export type MyPostsType = {
    message:string
    state: profilePageType
    addPostCallback: (m:string)=>void
    updateYourPostText: (t:string)=>void
    dispatch:(action: ActionType)=> void
}



const MyPosts = (props: MyPostsType) => {
  let postsElement = props.state.posts.map( p => <Post message={p.message} likeCounts={p.likeCounts} id={new Date().getTime()} /> )

    let addPost = () =>{
            props.dispatch(addPostActionCreate(props.message))
            props.dispatch(changeNewTextCreate(''))
        }

    let newTextChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
      props.dispatch(changeNewTextCreate(e.currentTarget.value))
  }
  return (
    <div className={classes.postsBlock}>
      <h3>My post</h3>
      <div>
        <div className={classes.addPostAreaBlock}>
          <textarea value={props.message}
                    onChange={newTextChangeHandler}
          ></textarea>
        </div>
        <div className={classes.addPostButtonBlock} >
          <button onClick={addPost}>Add Post</button>
        </div>
      </div>
      <div className={classes.posts}>
          {postsElement}
      </div>
    </div>
  )
}
export default MyPosts