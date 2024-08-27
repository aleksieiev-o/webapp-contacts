import { EndpointsList } from '@/shared/Endpoints.enum';
import { createDataEndpoint, createDataItemEndpoint } from './_vm/user';
import { apiClient } from './_api/apiClient';
import { AxiosResponse } from 'axios';

export const fetchAllData = async <T>(endpoint: EndpointsList): Promise<T[]> => {
  const response: Promise<AxiosResponse<T[]>> = apiClient.get(createDataEndpoint({ endpoint }));
  return response
    .then(({ data }) => data)
    .catch((err) => {
      console.warn(err);
      return Promise.reject<T[]>([]);
    });
};

export const fetchDataItemById = async <T>(endpoint: EndpointsList, itemId: string): Promise<T> => {
  const response: Promise<AxiosResponse<T>> = apiClient.get(createDataItemEndpoint({ endpoint, itemId }));
  return response
    .then(({ data }) => data)
    .catch((err) => {
      console.warn(err);
      return Promise.reject<T>({});
    });
};

export const updateDataItemById = async <T>(endpoint: EndpointsList, itemId: string, payload: T): Promise<T> => {
  const response: Promise<AxiosResponse<T>> = apiClient.put(createDataItemEndpoint({ endpoint, itemId }), payload);
  return response
    .then(({ data }) => data)
    .catch((err) => {
      console.warn(err);
      return Promise.reject(err);
    });
};

export const removeDataItemById = async <T>(endpoint: EndpointsList, itemId: string): Promise<T> => {
  const response: Promise<AxiosResponse<T>> = apiClient.put(createDataItemEndpoint({ endpoint, itemId }));
  return response
    .then(({ data }) => data)
    .catch((err) => {
      console.warn(err);
      return Promise.reject(err);
    });
};
