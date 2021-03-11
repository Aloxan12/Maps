import React from 'react';
import { NavLink } from 'react-router-dom';
import classes  from './Navbar.module.css';
import Friends from "./Friends/Friends";
import {friendsType, friendType} from "../../redux/state";

export type NavbarType = {
    state:friendsType
}

const Navbar = (props: NavbarType)=>{
    return ( <nav className={classes.nav}>
    <div className={classes.item}>
      <NavLink to="/profile" activeClassName={classes.activLink}>Profile</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to="/dialogs"  activeClassName={classes.activLink}>Massage</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to="/news" activeClassName={classes.activLink}>News</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to="/music" activeClassName={classes.activLink}>Music</NavLink>
    </div>
    <div className={classes.item}>
      <NavLink to="/setting" activeClassName={classes.activLink}>Setting</NavLink>
    </div>
    <div>
        <Friends state={props.state} />
    </div>
  </nav>
    )
}
export default Navbar;