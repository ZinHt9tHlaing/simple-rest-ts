import { Request } from "express";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    username: string;
    email: string;
    _id: string | Types.ObjectId;
  };
}