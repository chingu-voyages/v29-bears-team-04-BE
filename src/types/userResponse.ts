import { User } from '.prisma/client';

export interface UserResponse {
  User?: {
    success: boolean,
    data: User
  },
  Error?: {
    success: boolean,
    errorMessage: string
  }
} 