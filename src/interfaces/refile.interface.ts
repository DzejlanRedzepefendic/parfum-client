import { Pagination } from "./global.interface.ts";

interface DecimalValue {
    $numberDecimal: string;
}

interface Article {
    articleId: string;
    quantity: number;
}

interface CompanyDetail {
    _id: string;
    name: string;
    articleIds: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface FilledByDetail {
    _id: string;
    username: string;
    role: number;
    __v: number;
}

interface ArticleDetail {
    _id: string;
    name: string;
    price: DecimalValue;
    description: string;
    quantity: DecimalValue;
    createdAt: string;
    updatedAt: string;
    __v: number;
    filledQuantity: number;
}

export interface Refill {
    _id: string;
    expiresAt: string;
    filledAt: string;
    description: string;
    articles: Article[];
    notificationReadBy: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    companyDetails: CompanyDetail[];
    filledByDetails: FilledByDetail[];
    articleDetails: ArticleDetail[];
    remainingTime: number;
    formattedRemainingTime: string;
}

export interface GetRefillsParams {
    page?: number;
    limit?: number;
    companyId: string;
    showExpired?: boolean;
}

export interface GetRefillsByCompanyResponse {
    data: Refill[];
    pagination: Pagination;
}
