export type TErrorResponse = {
  message?: string;
  config?: {
    baseURL?: string;
    url?: string;
  };
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
    };
  };
};
