export interface ExecutedByDetails {
  username: string;
  role: number;
}

export interface DecimalValue {
  $numberDecimal: string;
}

export interface ArticleState {
  _id: string;
  name: string;
  price: DecimalValue;
  description: string;
  quantity: DecimalValue;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CompanyState {
  _id: string;
  name: string;
  articleIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RefillState {
  companyId: string;
  expiresAt: string;
  filledAt: string;
  description: string;
  articles: { articleId: string; quantity: number }[];
  filledBy: string;
  notificationReadBy: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserState {
  username: string;
  password: string;
  role: number;
  notifications: {
    notificationIntervalDays: number[];
    phoneNumbers: string[];
    subscribed: boolean;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Change {
  previousState?: ArticleState | CompanyState | RefillState | UserState;
  currentState?: ArticleState | CompanyState | RefillState | UserState;
  executedBy: string;
}

export interface LogEntry {
  _id: string;
  changes: Change;
  action: string;
  seenBy: string[];
  seen: boolean;
  executedByDetails: ExecutedByDetails;
  createdAt: string;
  auditText: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface AuditLogs {
  data: LogEntry[];
  pagination: Pagination;
  totalNotSeenCount: number;
}
