import axiosInstance from "../config.ts";

export interface RefillParfumeNotificationOptions {
  days?: number;
  page?: number;
  limit?: number;
  read?: boolean;
}

export interface RefillParfumRequest {
  companyId: string;
  expiresAt: string; // Datum u formatu 'YYYY-MM-DD'
  articles: {
    articleId: string;
    quantity: number;
  }[];
}

export const refillParfum = async (data: RefillParfumRequest) => {
    const res = await axiosInstance.post('/refills', data);
    return res.data;

}


export const refillParfumeNotification = async (options: RefillParfumeNotificationOptions = { days: 7 }) => {
  const { days = 7, page, limit, read } = options;

  let url = `/refills-notifications?days=${days}`;
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (limit !== undefined) {
    url += `&limit=${limit}`;
  }
  if (read !== undefined) {
    url += `&read=${read}`;
  }

  const res = await axiosInstance.get(url);
  return res.data;
}
