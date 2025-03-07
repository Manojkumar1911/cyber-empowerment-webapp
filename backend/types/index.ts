export interface User {
  id: string;
  email: string;
  name: string;
}

// Express request augmentation for authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}