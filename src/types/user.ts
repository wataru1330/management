export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'talent';
  profileImage?: string;
  managerId?: string;
  talents?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'admin' | 'manager' | 'talent';
}

export interface TalentAssignment {
  talentId: string;
  managerId: string;
}