import { LoginData, LoginResponse } from "../../../interfaces/auth.interface";
import { login } from "../../request/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginQuery = () => {
    const mutatin = useMutation<LoginResponse, Error, LoginData>({
        mutationFn: login,
    });
    return mutatin;
};