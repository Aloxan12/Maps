import React from 'react';
import classes  from './../Navbar.module.css';
import {NavLink} from "react-router-dom";

export type FriendType = {
    id: number
    name: string
    src: string
}

const Friends = (props: FriendType)=>{
    let path = "/Navbar/" + props.id;
    return (
        <div>
            <div>
                <img src={props.src} />
            </div>
            <NavLink to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}
export default Friends;