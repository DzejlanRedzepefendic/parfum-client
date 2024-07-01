import { Pagination } from "./global.interface";

interface Address {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface Contact {
    phone?: string;
    email?: string;
}

interface BankDetails {
    accountNumber?: string;
    bankName?: string;
    iban?: string;
    swift?: string;
}

interface Article {
    _id: string;
    name: string;
    price: {
        $numberDecimal: string;
    };
    description: string;
    quantity: {
        $numberDecimal: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface RefillArticle {
    articleId: string;
    quantity: number;
}

interface RemainingTime {
    days: number;
    hours: number;
}

interface LatestRefill {
    _id: string;
    companyId: string;
    expiresAt: string;
    filledAt: string;
    description: string;
    articles: RefillArticle[];
    filledBy: string;
    notificationReadBy: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    remainingTime: RemainingTime;
    formattedRemainingTime: string;
}

export interface CreateCompanyRequestData {
    name: string;
    deviceNumber?: number;
    pib?: string;
    address?: Address;
    contact?: Contact;
    bankDetails?: BankDetails;
    description?: string;
    articleIds?: string[];
}

export interface RemoveArticleFromCompanyRequestData {
    companyId: string;
    articleId: string;
    amount?: number;
}

export interface Company {
    _id: string;
    name: string;
    pib?: string;
    address: Address;
    contact: Contact;
    bankDetails: BankDetails;
    description?: string;
    articleIds: string[];
    articles: Article[];
    latestRefill: LatestRefill;
}

export interface CompanyResponseData {
    data: Company[];
    pagination: Pagination;
}
