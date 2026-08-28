export interface Ticket {
  id: number;
  code: string;
  is_used: number; // 0 for unused, 1 for used (SQLite doesn't have a boolean type)
  used_at: string | null; // ISO 8601 format or null if not used
  created_at: string;
  updated_at: string;
}

export interface CreateTicketResponse {
  id: number;
  code: string;
  is_used: boolean;
  used_at: string | null;
  created_at: string;
  updated_at: string;
}