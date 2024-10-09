import { Router } from 'express';
import { ProdModel } from '../models/prod.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';

const router = Router();

router.get(
    '/',
    handler(async (req, res) => {
        const prods = await ProdModel.find({});
        res.send(prods);
    })
);

router.get(
    '/tags',
    handler(async (req, res) => {
        const tags = await ProdModel.aggregate([
            {
                $unwind: '$tags',
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count',
                },
            },
        ]).sort({ count: -1 });

        const all = {
            name: 'All-Products',
            count: await ProdModel.countDocuments(),
        };

        tags.unshift(all);

        res.send(tags);
    })
);

router.get(
    '/search/:searchTerm',
    handler(async (req, res) => {
        const { searchTerm } = req.params;
        const searchRegex = new RegExp(searchTerm, 'i');

        const prods = await ProdModel.find({ title: { $regex: searchRegex } });
        res.send(prods);
    })
);

router.get(
    '/tag/:tag',
    handler(async (req, res) => {
        const { tag } = req.params;
        const prods = await ProdModel.find({ tags: tag });
        res.send(prods);
    })
);

router.get(
    '/:prodId',
    handler(async (req, res) => {
        const { prodId } = req.params;
        const prod = await ProdModel.findById(prodId);
        res.send(prod);
    })
);

router.post(
    '/',
    admin,
    handler(async (req, res) => {
        const { title, price, tags, image, category } =
            req.body;

        const prod = new ProdModel(
            {
                title,
                price,
                tags: tags.split ? tags.split(',') : tags,
                image,
                category,
            }
        );
        await prod.save()

        res.send(prod);
    })
);

router.put(
    '/',
    admin,
    handler(async (req, res) => {
        const { id, title, price, tags, image, category } =
            req.body;

        await ProdModel.updateOne(
            { _id: id },
            {
                title,
                price,
                tags: tags.split ? tags.split(',') : tags,
                image,
                category,
            }
        );

        res.send();
    })
);

router.delete(
    '/:prodId',
    admin,
    handler(async (req, res) => {
        const { prodId } = req.params;
        await ProdModel.deleteOne({ _id: prodId });
        res.send();
    })
);


export default router;