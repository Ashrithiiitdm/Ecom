import { v2 as cloudinary } from 'cloudinary';
import { Product } from '../models/productModel.js';

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });

                return result.secure_url;
            }),
        )

        const prodData = {
            name,
            description,
            price: Number(price),
            subcategory:subCategory,
            category,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()

        }

        console.log(prodData);

        const newProduct = new Product(prodData);
        console.log('New Product:', newProduct);
        await newProduct.save();

        return res.json({
            success: true,
            message: 'Product added successfully'
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }
};

export const getProduct = async (req, res) => {

    try {
        const { product_id } = req.body;

        const product = await Product.findById(product_id);

        return res.json({
            success: true,
            product
        });

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }

};


export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        //console.log(products);
        return res.json({
            success: true,
            products
        });
    }

    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }

};

export const removeProduct = async (req, res) => {

    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);

        return res.json({
            success: true,
            message: 'Product removed successfully'
        });
    }

    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }

};

