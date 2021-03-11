import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import { BrowserRouter, Route } from "react-router-dom";
import {StoreType} from "./redux/state";

export type AppType = {
  store: StoreType
  //state: StateType
  //addPostCallback:(m:string)=>void
  //updateYourPostText: (t:string)=>void
  //dispatch:(action: ActionType)=> void
}

const App: React.FC<AppType> = (props) => {
  const state = props.store.getState();
  return <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar state={state.navbarPage}/>
      <div className="app-wrapper-content">
        <Route path='/profile' render={() => <Profile state={state.profilePage}
                                                      addPostCallback={props.store.addPostCallback.bind(props.store)}
                                                      message={state.profilePage.newPostText}
                                                      updateYourPostText={props.store.updateYourPostText.bind(props.store)}
                                                      dispatch={props.store.dispatch.bind(props.store)}
                                              />} />
        <Route path='/dialogs' render={() => <Dialogs state={props.store._state.dialogsPage}
                                                      dispatch={props.store.dispatch.bind(props.store)}
                                                      message={state.dialogsPage.newMessage}
        />}  />
        <Route path='/music' render={() => <Music />} />
        <Route path='/news' render={() => <News />} />
        <Route path='/setting' render={() => <Setting />} />
      </div>
    </div>
  </BrowserRouter>;
}

export default App;
