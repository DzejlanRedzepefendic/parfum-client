import { Pagination } from "./global.interface";
import {Article} from "./article.interface.ts";

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

export interface Company {
    _id: string;
    name: string;
    pib?: string;
    address: Address;
    contact: Contact;
    bankDetails: BankDetails;
    description?: string;
    articleIds: Article[];

}

export interface CompanyResponseData {
    data: Company[];
    pagination:Pagination;
}