export interface Ticket {
  id: number;
  code: string;
  is_used: boolean;
  used_at: string | null;
  created_at: string;
  updated_at: string;
}