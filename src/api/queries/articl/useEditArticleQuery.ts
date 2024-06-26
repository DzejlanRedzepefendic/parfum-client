import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editArticle } from "../../request/article"
import { EditArticle } from "../../../interfaces/article.interface"
import { QUERY_KEYS } from "../../../constants/queryKey";
import { toast } from "react-toastify";

export const useEditArticleQuery = () => {

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn:async (data:{data:EditArticle,id:string})=> await editArticle(data.data,data.id),
    onSuccess:()=>{
        toast.success('Parfem uspješno izmjenjen');
        Promise.all([
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_ALL_AUDITS]
            })
        ])
           queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_ALL_ARTICLES]
              })
    }
})  
        return mutation;
}