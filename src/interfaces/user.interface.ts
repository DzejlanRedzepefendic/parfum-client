
export interface GetMeResponse {
  username: string;
  role: number;
  id: string;
  notifications: {
    notificationIntervalDays: number[];
    phoneNumbers: string[];
    subscribed: boolean;
    notificationTime: {
      hours: number;
      meridiem: string;
    }
  }
}



  export interface PullUser {
    username: string;
    password: string;
    _id: string;
    role: number;
  }

  export interface UpdatedUserData {
    username?: string;
    password?: string;
    _id: string;
    notifications?: {
      notificationIntervalDays?: number[];
      phoneNumbers?: string[];
      subscribed?: boolean;
    };
    notificationTime?: {
      hours?: number;
      meridiem?: string;
    };
  }