import { makeApiRequest } from "../makeApiRequest";
import { GetApiParams, Pagination } from "../types";
import { MutateStore, Store } from "./types";

export const getStore = async ({
  page,
  size,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Store>>({
    method: "get",
    url: `lojas?page=${page}&size=${size}${filter || ""}`,
  });
};

export const getStoreList = async (): Promise<
  Pagination<Store>
> => {
  return await makeApiRequest({
    method: "get",
    url: `lojas`,
  });
};

export const getStoreById = async (id: number) => {
  return makeApiRequest<Store>({
    method: "get",
    url: `lojas/${id}`,
  });
};

export const mutateStore = async ({
  id,
  data,
}: {
  id?: number;
  data: MutateStore;
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `lojas/${id}`,
      data: data,
    });
  }
  return makeApiRequest({
    method: "post",
    url: `lojas`,
    data: data,
  });
};
