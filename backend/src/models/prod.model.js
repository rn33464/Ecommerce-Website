import { model, Schema } from 'mongoose';

export const ProdSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: [String] },
        category: { type: String, required: true },
        image: { type: String, required: true },
        stars: { type: Number, default: 3 },
        tags: { type: [String] },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

export const ProdModel = model('prod', ProdSchema);