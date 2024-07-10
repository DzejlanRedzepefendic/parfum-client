import { AuditLogs, LogEntry } from "../../interfaces/audit.interface";
import {  SortQuery, queryBuilderForSort } from "../../utils/queryBuilder";
import axiosInstance from "../config";

export const getAllAudits = async (props?: SortQuery & { page?: number; limit?: number }): Promise<AuditLogs> => {
  const query = queryBuilderForSort(props);
  const res = await axiosInstance.get(`/audits?${query}&page=${props?.page ?? 1}&limit=${props?.limit ?? 10}`);
  return res.data;
}


export const markAudit = async (id:string):Promise<LogEntry> => {
  const res = await axiosInstance.put(`/audits/${id}`);
  return res.data;
}
