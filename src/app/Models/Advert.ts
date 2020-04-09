export class Advert {
    annoucementId: number;
    title: string;
    description: string;
    userId: number;
    createDate: Date;
    expireDate: Date;
    price: number;
    negotiable: boolean;
    isActive: boolean;
    categoryId: number;
    category: {
        categoryId: number,
        title: string,
        brands: null
    };
    user: {
        userId: number,
        name: string,
        email: string,
        townId: number,
        phoneNumber: string,
        town: {
            townId: number,
            title: string,
            coordX: number,
            coordY: number
        }
    };
    photos: any[];
}
