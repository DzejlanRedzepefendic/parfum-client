import { useQuery } from "@tanstack/react-query"
import { getAllArticles } from "../../request/article";
import { QUERY_KEYS } from "../../../constants/queryKey";
import { SearchParams } from "../../../interfaces/article.interface";

export const useGetAllArticlesQuery = (props:SearchParams) => {
    const query = useQuery({
        queryKey:[QUERY_KEYS.GET_ALL_ARTICLES,props],
        queryFn: async () => {
            try {
                const data = await getAllArticles(props);
                return data;
            } catch (error) {
                throw new Error('Došlo je do greške prilikom dohvaćanja svih parfema');
            }
        }
    });

    return query;
}