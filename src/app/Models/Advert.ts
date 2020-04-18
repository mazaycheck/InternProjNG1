import { Category } from './Category';
import { Brand } from './brand';

export class Advert {
    id: number;
    title: string;
    description: string;
    date: Date;
    price: number;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    photos: any[];
    userId: number;
    userName: string;
    userPhoneNumber: string;
    userTown: string;
}
