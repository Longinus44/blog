export class HttpError extends Error {
    constructor(public readonly statusCode: number, public readonly message: string) {
      super(message);
    }
  }
  
  export const handleHttpError = (error: HttpError) => {
    const { statusCode, message } = error;
  
    switch (statusCode) {
      case 400:
        return {
          status: statusCode,
          message: `Bad Request: ${message}`,
        };
      case 401:
        return {
          status: statusCode,
          message: `Unauthorized: ${message}`,
        };
      case 403:
        return {
          status: statusCode,
          message: `Forbidden: ${message}`,
        };
      case 404:
        return {
          status: statusCode,
          message: `Not Found: ${message}`,
        };
      case 500:
        return {
          status: statusCode,
          message: `Internal Server Error: ${message}`,
        };
      default:
        return {
          status: statusCode,
          message: `Unknown Error: ${message}`,
        };
    }
  };
  