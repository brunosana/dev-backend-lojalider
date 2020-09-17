import Product from '../models/Product';

interface CreateProductDTO {
    name: string;
    description?: string;
    price: number;
    photo?: string;
}

class ProductsRepository {
    private products: Product[];

    constructor() {
        this.products = [];
    }

    public create({
        name,
        description = '',
        price,
        photo = 'nophoto.jpg',
    }: CreateProductDTO): Product {
        const product = new Product({ name, photo, price, description });
        this.products.push(product);
        return product;
    }

    public all(): Product[] {
        return this.products;
    }
}

export default ProductsRepository;
