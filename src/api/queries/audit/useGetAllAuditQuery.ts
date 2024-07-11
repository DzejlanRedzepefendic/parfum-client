import { useInfiniteQuery } from '@tanstack/react-query';
import { AuditLogs } from '../../../interfaces/audit.interface';
import { getAllAudits } from '../../request/audit';
import { QUERY_KEYS } from '../../../constants/queryKey';
import { SortQuery } from '../../../utils/queryBuilder';

export const useGetAllAuditQuery = (props: SortQuery) => {
    return useInfiniteQuery<AuditLogs, Error>({
        queryKey: [QUERY_KEYS.GET_ALL_AUDITS, props],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                // @ts-ignore
                return await getAllAudits({ ...props, page: pageParam, limit: 10 });
            } catch (error) {
                console.error(error);
                throw new Error('Došlo je do greške prilikom dohvaćanja svih logova');
            }
        },
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.pagination.currentPage + 1;
            return nextPage <= lastPage.pagination.totalPages ? nextPage : undefined;
        },
        initialPageParam: 1
    });
}
