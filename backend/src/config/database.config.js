import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { ProdModel } from '../models/prod.model.js';
import { sample_users } from '../data.js';
import { products } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUsers();
        await seedProds();
        console.log('connect successfully---');
    } catch (error) {
        console.log(error);
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log('Users seed is already done!');
        return;
    }

    for (let user of sample_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('Users seed is done!');
}

async function seedProds() {
    const prods = await ProdModel.countDocuments();
    if (prods > 0) {
        console.log('Products seed is already done!');
        return;
    }

    for (const prod of products) {
        prod.image = `/prods/${prod.image}`;
        await ProdModel.create(prod);
    }

    console.log('Products seed Is Done!');
}