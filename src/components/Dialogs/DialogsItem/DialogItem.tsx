import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './../Dialogs.module.css'


export type DialogsItemType = {
    name: string
    id: number
}

const DialogsItem = (props:DialogsItemType) =>{
    let path = "/dialogs/" + props.id;
    return (
        <div className= {classes.dialog + ' ' + classes.active}>
            <div>
            <img src="https://img3.goodfon.ru/wallpaper/nbig/f/67/naruto-shippuden-uzumaki-31.jpg" />
            </div>
            <NavLink to={path}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogsItem;