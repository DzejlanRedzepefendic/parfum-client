import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteArticle} from "../../request/article.ts";
import {toast} from "react-toastify";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";

export const useDeleteArticleQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => deleteArticle(id),
        onSuccess:()=>{
            toast('Parfem je uspešno obrisan!')
            return  Promise.all([
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_ALL_ARTICLES]}),
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_ALL_AUDITS]})
            ])
        }
    });
}
