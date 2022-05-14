export type ApiError = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};
