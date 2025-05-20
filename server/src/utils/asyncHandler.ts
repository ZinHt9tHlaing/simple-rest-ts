import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/authType";

const asyncHandler =
  (
    controllerFn: (
      req: Request | AuthRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
  };

export default asyncHandler;
