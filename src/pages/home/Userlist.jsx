import React from 'react'

const userlist = () => {
  return (
    <>
     <GroupCard cardtitle="userlist">
    <div className='usermainbox'>
     <div className='useritem'>
     <div className='userimgbox'>
    <Image source="" alt="img"/>
     </div>
     <div className='userinfobox'>
     <div>
      <h3>Israt jaman</h3>
      <p>Mern Developer</p>
     </div>
     <button className='addbutton'>
      <FaPlus/>
      </button>
     </div>
     </div>
    </div>
    <div className='usermainbox'>
     <div className='useritem'>
     <div className='userimgbox'>
     <Image source="" alt="img"/>
     </div>
     <div className='userinfobox'>
     <div>
      <h3>Israt jaman</h3>
      <p>Mern Developer</p>
     </div>
     <button className='addbutton'>
      <FaPlus/>
      </button>
     </div>
     </div>
    </div>
    <div className='usermainbox'>
     <div className='useritem'>
     <div className='userimgbox'>
     <Image source="" alt="img"/>
     </div>
     <div className='userinfobox'>
     <div>
      <h3>Israt jaman</h3>
      <p>Mern Developer</p>
     </div>
     <button className='addbutton'>
      <FaPlus/>
      </button>
     </div>
     </div>
    </div>
 </GroupCard>
    </>
  )
}

export default userlist