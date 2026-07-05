export interface AgentProfile {
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'agent' | 'inspector' | 'system';
}

export interface LoginResponse {
  status: 'success' | 'error';
  message: string;
  token: string;
  data: AgentProfile;
}

// Ensure this is named exactly TransactionDeal and exported explicitly
export interface TransactionDeal {
  id: string;
  reference_number: string;
  citizen_name: string;
  citizen_nid: string;
  property_lux_tier: 'Standard' | 'Premium' | 'Ultra Luxury';
  assigned_agent: string;
  valuation_afn: number;
  verification_status: 'Pending' | 'Verified' | 'Flagged';
  submission_date: string;
}