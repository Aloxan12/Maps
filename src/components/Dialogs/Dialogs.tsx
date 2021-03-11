import React, {ChangeEvent} from 'react'
import classes from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import {
    ActionType,
    addMessageActionCreate,
    addPostActionCreate, changeNewMessageTextCreate,
    changeNewTextCreate,
    dialogsPageType
} from "./../../redux/state";

type DialogsType = {
    state: dialogsPageType
    dispatch:(action: ActionType)=> void
    message: string
}




const Dialogs = (props: DialogsType ) =>{

    let dialogsElements = props.state.dialogs.map( d =><DialogsItem id={d.id} name={d.name}  /> )
    let messageElements = props.state.messages.map(m => <Message message={m.message} /> )


    let addMessage = () =>{
            props.dispatch(addMessageActionCreate(props.message))
            props.dispatch(changeNewMessageTextCreate(''))

    }
    let newTextMessageChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(changeNewMessageTextCreate(e.currentTarget.value))
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.massages}>
                {messageElements}
                <div className={classes.addMessage}>
                    <textarea value={props.message} onChange={newTextMessageChange}></textarea>
                    <button onClick={addMessage}>AddMessage</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;