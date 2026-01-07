import { Response } from 'express';

export class ApiResponse {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(statusCode: number, data: any, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export const sendResponse = (res: Response, response: ApiResponse) => {
  res.status(response.statusCode).json({
    status: response.success ? 'success' : 'error',
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  });
};
