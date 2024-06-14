import { GetMeResponse, PullUser, UpdatedUserData } from "../../interfaces/user.interface";
import axiosInstance from "../config";

export const getMe = async (): Promise<GetMeResponse> => {
         const res = await axiosInstance.get('/user/me');
         return res.data;
}

export const getAllUsers = async (): Promise<PullUser[]> => {
            const res = await axiosInstance.get('/users');
            return res.data;
};

export const updateUser = async (updateUser:UpdatedUserData):Promise<void> => {
            await axiosInstance.put(`/users/${updateUser._id}`, updateUser);
};