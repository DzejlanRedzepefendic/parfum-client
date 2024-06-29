
  export interface GetMeResponse {
    username: string;
    role: number;
    notifications: {
      notificationIntervalDays: number[];
      phoneNumbers: string[];
      subscription: boolean;
    }
    notificationTime:{
      hours: number;
      meridiem: string;
    }
  }
 

  export interface PullUser {
    username: string;
    password: string;
    _id: string;
    role: number;
  }

  export interface UpdatedUserData {
    username: string;
    password: string;
    _id:string
  }