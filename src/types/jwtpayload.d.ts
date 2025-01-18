import { JwtPayload } from 'jose';

export interface MyJwtPayload extends JwtPayload {
    id: string;
    username: string;
  }