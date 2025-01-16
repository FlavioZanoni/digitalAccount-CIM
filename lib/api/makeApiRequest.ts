import { isAxiosError } from "axios";
import { apiInstance } from "./apiInstance";

interface IApiRequest {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  filter?: any;
}

export const makeApiRequest = async <T>({
  method = "get",
  url,
  data,
  filter,
}: IApiRequest) => {
  try {
    const response = await apiInstance[method]<T>(
      `${url}${filter ? filter : ""}`,
      data,
    );
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw err.response?.data;
    } else {
      throw err;
    }
  }
};
