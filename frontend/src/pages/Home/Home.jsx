import React from 'react'
import { useSelector } from 'react-redux';
import UserDashboard from '../../components/user/UserDashboard';
import OwnerDashboard from '../../components/owner/OwnerDashboard';
import DeliveyBoy from '../../components/deliveyBoy/DeliveyBoy';

function Home() {
  const { userData } = useSelector((state) => state.user);
  // inorder to get the userRole
  return (
    <div className="container">

      {userData?.role=="user" && <UserDashboard/>}
      {userData?.role=="owner" && <OwnerDashboard/>}
      {userData?.role=="deliveryBoy" && <DeliveyBoy/>}
      
    </div>
  )
}

export default Home