import React from 'react';
import classes from "./ProfileInfo.module.css"

const ProfileInfo = ()=>{
    return ( <div className={classes.content}>
    <div>
      <img src="http://www.rosphoto.com/images/u/articles/1511/4-dalius-baranauskas.jpg" alt="photo" className={classes.mainimg}/>
    </div>
  </div>
    )
}
export default ProfileInfo;