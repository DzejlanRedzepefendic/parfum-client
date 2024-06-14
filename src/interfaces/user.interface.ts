
  export interface GetMeResponse {
    username: string;
    role: number;
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