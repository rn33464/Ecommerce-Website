import { useParams } from 'react-router-dom';
import classes from './prodEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../services/prodService';
import Title from '../../components/Title/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProdEditPage() {
    const { prodId } = useParams();
    const [image, setImage] = useState();
    const isEditMode = !!prodId;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return;

        getById(prodId).then(prod => {
            if (!prod) return;
            reset(prod);
            setImage(prod.image);
        });
    }, [prodId]);

    const submit = async prodData => {
        const prod = { ...prodData, image };

        if (isEditMode) {
            await update(prod);
            toast.success(`Product "${prod.title}" updated successfully!`);
            return;
        }

        const newProd = await add(prod);
        toast.success(`Product "${prod.title}" added successfully!`);
        navigate('/admin/editProd/' + newProd.id, { replace: true });
    };

    const upload = async event => {
        setImage(null);
        const image = await uploadImage(event);
        setImage(image);
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Edit Product' : 'Add Product'} />
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(submit)}
                    noValidate
                >
                    <InputContainer label="Select Image">
                        <input type="file" onChange={upload} accept="image/jpeg" />
                    </InputContainer>

                    {image && (
                        <a href={image} className={classes.image_link} target="blank">
                            <img src={image} alt="Uploaded" />
                        </a>
                    )}

                    <Input
                        type="text"
                        label="Title"
                        {...register('title', { required: true, minLength: 5 })}
                        error={errors.title}
                    />

                    <Input
                        type="number"
                        label="Price"
                        {...register('price', { required: true })}
                        error={errors.price}
                    />

                    <Input
                        type="text"
                        label="Tags"
                        {...register('tags')}
                        error={errors.tags}
                    />

                    <Input
                        type="text"
                        label="Category"
                        {...register('category', { required: true })}
                        error={errors.category}
                    />

                    <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
                </form>
            </div>
        </div>
    );
}