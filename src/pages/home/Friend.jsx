import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import { FaPlus } from "react-icons/fa";

const Friend = () => {
  return (
    <div>
  <GroupCard cardtitle="Friend">
    <div className='usermainbox'>
     <div className='useritem'>
     <div className='userimgbox'>
    
     </div>
     <div className='userinfobox'>
     <div>
      <h3>Israt</h3>
      <p>Mern Developer</p>
     </div>
     <button className='addbutton'>
      Block
      </button>
     </div>
     </div>
    </div>
 </GroupCard>

    </div>
  )
}

export default Friend