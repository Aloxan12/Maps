import React from 'react';
import classes  from './../Navbar.module.css';
import Friend from "./Friend/Friend";
import {friendsType} from "../../../redux/state";
import {NavbarType} from "../Navbar";

export type FriendsType = {
    state:friendsType
}

const Friends = (props: FriendsType)=>{
    let friendsElements = props.state.friends.map( d =><Friend id={d.id} name={d.name} src={d.src}  /> )
    return (
        <div>
            <div className={classes.blockFriends}>
                <h3>Friends</h3>
                <div className={classes.friends}>
                    {friendsElements}
                </div>
            </div>
        </div>
    )
}
export default Friends;