interface IHeaders {
  [header: string]: string | number | boolean;
}
export interface IResponseHandler {
  statusCode: number;
  body: string;
}
export interface IResponseHandlerReturn {
  statusCode: number;
  headers: IHeaders;
  body: string;
}

export default {
  createResponse({
    statusCode,
    body,
  }: IResponseHandler): IResponseHandlerReturn {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body,
    };
  },
};
