export class Advert {
    annoucementId: number;
    title: string;
    description: string;
    userId: number;
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
    user: {
        userId: number,
        name: string,
        email: string,
        townId: number,
        town: {
            townId: number,
            title: string,
            coordX: number,
            coordY: number
        }
    };

}
