export interface ExecutedByDetails {
  username: string;
  role: number;
}

export interface PreviousState {
  username: string;
  password: string;
  role: number;
  _id: string;
  __v: number;
}

export interface CurrentState {
  username: string;
  password: string;
  role: number;
  _id: string;
  __v: number;
}

export interface Change {
  previousState?: PreviousState; // previousState je opcionalan jer nije prisutan u svim zapisima
  currentState: CurrentState;
  executedBy: string;
}

export interface LogEntry {
  _id: string;
  changes: Change;
  action: string;
  seenBy: string[];
  seen: boolean;
  executedByDetails: ExecutedByDetails;
  createdAt: string;
}

export interface AuditLogs {
  data: LogEntry[];
  totalNotSeenCount: number;
}
