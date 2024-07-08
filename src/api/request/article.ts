import {   ArticleData, CreateArticle, EditArticle, SearchParams } from "../../interfaces/article.interface";
import axiosInstance from "../config";

export const createArticle = async (data:CreateArticle) =>{
    const res = await axiosInstance.post('/articles', data);
    return res.data;
}

export const getAllArticles = async (props:SearchParams):Promise<ArticleData> => {
    const res = await axiosInstance.get(`/articles?name=${props.name}&limit=999`);
    return res.data;
}


export const editArticle = async(data:EditArticle,id:string) => {
    const res = await axiosInstance.put(`/articles/${id}`, data);
    return res.data;
}

export const deleteArticle = async(id:string) => {
    const res = await axiosInstance.delete(`/articles/${id}`);
    return res.data;
}