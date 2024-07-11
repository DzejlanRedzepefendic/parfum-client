import {useGetRefillByCompanyId} from "../api/queries/refill/useGetRefillByCompanyId.ts";
import {useParams} from "react-router-dom";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {Refill} from "../interfaces/refile.interface.ts";

function CompanyRefillDetail() {
    const { companyId } = useParams<{ companyId: string }>();

    if (!companyId) {
        return <div>Kompanija nije pronađena!</div>;
    }

    const { data, isLoading } = useGetRefillByCompanyId({
        companyId: companyId,
        page: 1,
        limit: 10,
        showExpired: false
    });

    if (isLoading) {
        return <div>Učitavanje...</div>;
    }

    return (
        <Box sx={{padding:'10px 10px 50px 10px'}}>
            <h1>Istorija kopmanije</h1>
            {data?.data.map((refill: Refill) => (
                <Card key={refill._id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">
                            {refill.companyDetails[0]?.name}
                        </Typography>
                        <Typography variant="body2">
                            Punjenje odradjeno: {new Date(refill.filledAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                            Opis: {refill.description}
                        </Typography>
                        <Typography variant="body2">
                            Napunioc: {refill.filledByDetails[0]?.username}
                        </Typography>

                        <Typography variant="body2">
                            Ističe: {new Date(refill.expiresAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                            Parfemi:
                            {refill.articleDetails.map((article) => (
                                <div key={article._id}>
                                    {article.name} - Količina: {article.filledQuantity}
                                </div>
                            ))}
                        </Typography>
                        <Typography variant="body2">
                            Preostalo vreme: {refill.formattedRemainingTime}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default CompanyRefillDetail;