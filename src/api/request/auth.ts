import { LoginData, LoginResponse, RegisterData, RegisterResponse } from "../../interfaces/auth.interface";
import axiosInstance from "../config";

export const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/login', data);
    return response.data;
  };

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>('/users', data);
    return response.data;
}