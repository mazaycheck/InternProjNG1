export class Advert {
    annoucementId: number;
    title: string;
    description: string;
    userId: number;
    user: null;
    createDate: Date;
    expireDate: Date;
    price: number;
    negotiable: boolean;
    photos: null ;
    isActive: boolean;
    categoryId: number;
    category: {
        categoryId: number,
        title: string,
        brands: null
    };
}
