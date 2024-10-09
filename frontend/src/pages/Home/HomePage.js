import React, { useEffect, useReducer } from 'react';
import { getAll, getAllByTag, getAllTags, search } from '../../services/prodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState = { prods: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'PRODS_LOADED':
            return { ...state, prods: action.payload };
        case 'TAGS_LOADED':
            return { ...state, tags: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { prods, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect(() => {
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));
        const loadProds = tag ? getAllByTag(tag) : searchTerm ? search(searchTerm) : getAll();
        loadProds.then(prods => dispatch({ type: 'PRODS_LOADED', payload: prods }));
    }, [searchTerm, tag]);
    return (
        <>
            <Search />
            <Tags tags={tags} />
            {prods.length === 0 && <NotFound linkText="Reset Search" />}
            <Thumbnails prods={prods} />
        </>
    );
}
