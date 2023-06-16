export interface User {

  id: number;
  avatarPublicId: number;
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  rolesList: string[];
  
}
