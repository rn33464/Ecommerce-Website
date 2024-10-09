import React from 'react';
import { Link } from 'react-router-dom';
import classes from './thumbnails.module.css';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';

export default function Thumbnails({ prods }) {
    return (
        <ul className={classes.list}>
            {prods.map(prod => (
                <li key={prod.id}>
                    <Link to={`/prod/${prod.id}`}>
                        <img
                            className={classes.image}
                            src={`${prod.image}`}
                            alt={prod.title}
                        />
                    </Link>
                    <div className={classes.content}>
                        <div className={classes.name}>{prod.title}</div>
                        <div className={classes.stars}>
                            <StarRating stars={prod.stars} />
                        </div>
                        <div className={classes.price}>
                            <Price price={prod.price} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
