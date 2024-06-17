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

export interface CreateCompanyRequestData {
    name: string;
    pib?: string;
    deviceNumber?: number;
    address?: Address;
    contact?: Contact;
    bankDetails?: BankDetails;
    description?: string;
}

export interface Company {
    _id: string;
    name: string;
    pib?: string;
    address: Address;
    contact: Contact;
    bankDetails: BankDetails;
    description?: string;

}

export interface CompanyResponseData {
    data: Company[];
    pagination:Pagination;
}