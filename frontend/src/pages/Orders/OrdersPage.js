import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

import classes from './ordersPage.module.css';
import Title from '../../components/Title/Title';
// import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';

export default function OrdersPage() {
    const { clearCart } = useCart();


    const { cart } = useCart();
    const { user } = useAuth();
    // const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart });
    clearCart()

    return (
        <>

            <div className={classes.content}>
                <Title title="Order Form" fontSize="1.6rem" />
                <div className={classes.inputs}>
                    <div>Customer Name : {user.name}</div>
                    <div>Customer Address : {user.address}</div>
                </div>
                <OrderItemsList order={order} />
            </div>

            <div className={classes.buttons_container}>
                <div className={classes.buttons}>
                </div>
            </div>
        </>
    );
}