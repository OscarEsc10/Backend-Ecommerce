export interface Address {
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // hashed or plain for demo
  isActive: boolean;
  role: 'admin' | 'user';
  address: Address;
  createdAt: string;
}
