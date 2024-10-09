import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/prodService';
import classes from './prodPage.module.css';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';
export default function ProdPage() {
    const [prod, setProd] = useState({});
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(prod);
        navigate('/cart');
    }

    useEffect(() => {
        getById(id).then(setProd);
    }, [id]);
    return (
        <>
            {!prod ? (<NotFound message="Products Not Found!" linkText="Back To HomePage" />) : (
                <div className={classes.container}>
                    <img
                        className={classes.image}
                        src={`${prod.image}`}
                        alt={prod.title}
                    />
                    <div className={classes.details}>
                        <div className={classes.header}>
                            <span className={classes.name}>{prod.title}</span>
                        </div>

                        <div className={classes.rating}>
                            <StarRating stars={prod.stars} size={25} />
                        </div>
                        <div className={classes.tags}>
                            {prod.tags && (
                                <Tags
                                    tags={prod.tags.map(tag => ({ name: tag }))}
                                    forProdPage={true}
                                />
                            )}
                        </div>
                        <div className={classes.price}>
                            <Price price={prod.price} />
                        </div>
                        <button onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            )}
        </>
    );
}