import { AuditLogs, LogEntry } from "../../interfaces/audit.interface";
import {  SortQuery, queryBuilderForSort } from "../../utils/queryBuilder";
import axiosInstance from "../config";

export const getAllAudits = async (props?:SortQuery):Promise<AuditLogs>=> {
  const query = queryBuilderForSort(props);
  const res = await axiosInstance.get(`/audits?${query}&limit=999999999`);
  return res.data;
}

export const markAudit = async (id:string):Promise<LogEntry> => {
  const res = await axiosInstance.put(`/audits/${id}`);
  return res.data;
}
