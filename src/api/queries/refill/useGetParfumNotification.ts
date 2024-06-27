import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";
import {refillParfumeNotification, RefillParfumeNotificationOptions} from "../../request/refill.ts";

export const useGetParfumNotification = (options:RefillParfumeNotificationOptions) => {
  return useQuery({
      queryKey:[QUERY_KEYS.GET_NOTIFICATIONS, options],
      queryFn:async () => await refillParfumeNotification(options)
  });
}