import {LoginData, LoginResponse} from "../../../interfaces/auth.interface";
import {login} from "../../request/auth";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";

export const useLoginQuery = () => {
    return useMutation<LoginResponse, Error, LoginData>({
        mutationFn: login,
        onSuccess: () => {
            toast('Uspješno ste se prijavili')
        },
        onError: () => {
            toast.error('Neuspješna prijava, pokušajte ponovo.')
        }
    });
};