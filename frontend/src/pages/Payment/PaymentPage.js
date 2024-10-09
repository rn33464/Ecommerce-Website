import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

import classes from './paymentPage.module.css';
import Title from '../../components/Title/Title';
// import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';

export default function PaymentPage() {
    const { clearCart } = useCart();


    const { cart } = useCart();
    const { user } = useAuth();
    // const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart });

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
                    {/* <Button
                        type="submit"
                        text="PAY"
                        // onClick={clearCart()}
                        width="100%"
                        height="3rem"
                    /> */}
                </div>
            </div>
        </>
    );
}