import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from './firebase';
import { useStateValue } from "./StateProvider";
import { collection, doc, orderBy, onSnapshot, query } from 'firebase/firestore';
import Order from './Order';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(db, 'users', user?.uid, 'orders');
      const q = query(userOrdersRef, orderBy('created', 'desc'));

      const unsubscribe = onSnapshot(q, snapshot => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders_order'>
        {orders?.map(order => (
          <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders
