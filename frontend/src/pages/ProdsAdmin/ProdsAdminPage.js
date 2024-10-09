import { useEffect, useState } from 'react';
import classes from './prodsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/prodService';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';

export default function ProdsAdminPage() {
    const [prods, setProds] = useState();
    const { searchTerm } = useParams();

    useEffect(() => {
        loadProds();
    }, [searchTerm]);

    const loadProds = async () => {
        const prods = searchTerm ? await search(searchTerm) : await getAll();
        setProds(prods);
    };

    const ProdsNotFound = () => {
        if (prods && prods.length > 0) return;

        return searchTerm ? (
            <NotFound linkRoute="/admin/prods" linkText="Show All" />
        ) : (
            <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
        );
    };

    const deleteProd = async prod => {
        const confirmed = window.confirm(`Delete Product ${prod.title}?`);
        if (!confirmed) return;

        await deleteById(prod.id);
        toast.success(`"${prod.title}" Has Been Removed!`);
        setProds(prods.filter(p => p.id !== prod.id));
    };

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                <Title title="Manage Products" margin="1rem auto" />
                <Search
                    searchRoute="/admin/prods/"
                    defaultRoute="/admin/prods"
                    margin="1rem 0"
                    placeholder="Search Products"
                />
                <Link to="/admin/addProd" className={classes.add_prod}>
                    Add Product +
                </Link>
                <ProdsNotFound />
                {prods &&
                    prods.map(prod => (
                        <div key={prod.id} className={classes.list_item}>
                            <img src={prod.image} alt={prod.title} />
                            <Link to={'/prod/' + prod.id}>{prod.title}</Link>
                            <Price price={prod.price} />
                            <div className={classes.actions}>
                                <Link to={'/admin/editProd/' + prod.id}>Edit</Link>
                                <Link onClick={() => deleteProd(prod)}>Delete</Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}