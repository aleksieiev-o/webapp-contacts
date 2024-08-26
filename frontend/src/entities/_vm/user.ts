import { EndpointsList } from '@/shared/Endpoints.enum';

interface IPayload {
  endpoint: EndpointsList;
  itemId: string;
}

type TCreateEndpoint = Omit<IPayload, 'itemId'>;
type TCreateItemDataEndpoint = IPayload;

export const createDataEndpoint = (payload: TCreateEndpoint): string => {
  const { endpoint } = payload;

  try {
    return `${endpoint}`;
  } catch (err) {
    throw new Error(`An error occurred. \n${err}`);
  }
};

export const createDataItemEndpoint = (payload: TCreateItemDataEndpoint): string => {
  const { endpoint, itemId } = payload;

  try {
    return `${endpoint}`.replace('[id]', itemId);
  } catch (err) {
    throw new Error(`An error occurred. \n${err}`);
  }
};
