import Product from "../models/Product.js";



export const createProduct = async (req, res) => {
    const { name, category, price, imgUrl } = req.body

    const newProduct = new Product({ name, category, price, imgUrl })

    const productSaved = await newProduct.save()
    
    res.status(201).json(productSaved)




}

export const getProducts = async (req, res) => {
    const products = await Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
}



export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ 404: 'not_found' }))



}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json('Error: ' + err));

}

export const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
        .then(product => res.status(204).json(product))
        .catch(err => res.status(400).json('Error: ' + err));


}

