import { uuid } from 'uuidv4';

class Product {
    id: string;

    name: string;

    description: string;

    price: number;

    photo: string;

    constructor({ name, price, photo, description = '' }: Omit<Product, 'id'>) {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.price = price;
        this.photo = photo;
    }
}

export default Product;
