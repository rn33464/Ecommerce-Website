import React from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags, forProdPage }) {
    return (
        <div
            className={classes.container}
            style={{
                justifyContent: forProdPage ? 'start' : 'center',
            }}
        >
            {tags.map(tag => (
                <Link key={tag.name} to={`/tag/${tag.name}`}>
                    {tag.name}
                    {!forProdPage && `(${tag.count})`}
                </Link>
            ))}
        </div>
    );
}