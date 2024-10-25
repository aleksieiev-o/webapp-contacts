import { CreateContactDTO, IContact, UpdateContactDTO } from '@/shared/types/Contact';
import { fetchAllData, fetchDataItemById, removeDataItemById, updateDataItemById } from '../_db.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../_api/apiClient';
import { createDataEndpoint } from '../_vm/user';
import { AxiosResponseExceptionData } from '@/shared/types/Exceptions';

const sortLastName = <T extends { lastName: string }>(payload: T[], sortType: 'AZ' | 'ZA'): T[] => {
  if (payload instanceof Array) {
    return payload.sort((a, b) => {
      if (sortType === 'AZ') {
        return a.lastName.localeCompare(b.lastName);
      } else {
        return b.lastName.localeCompare(a.lastName);
      }
    });
  }

  console.warn(typeof payload);
  return [];
};

export const fetchAllContacts = async (): Promise<IContact[]> => {
  const contacts = await fetchAllData<IContact>(EndpointsList.CONTACTS);
  return sortLastName(contacts, 'AZ');
};

export const fetchContactById = async (id: string): Promise<IContact> => {
  return await fetchDataItemById<IContact>(EndpointsList.CONTACT_BY_ID, id);
};

export const createContact = async (payload: CreateContactDTO): Promise<IContact> => {
  const response: Promise<AxiosResponse<IContact>> = apiClient.post(createDataEndpoint({ endpoint: EndpointsList.CONTACT_CREATE }), payload);

  return response
    .then(({ data }) => data)
    .catch((err: AxiosError<AxiosResponseExceptionData>) => {
      console.warn(err.code, err.message, err);
      return Promise.reject(err.response?.data);
    });
};

export const updateContact = async (id: string, payload: UpdateContactDTO): Promise<IContact> => {
  return (await updateDataItemById(EndpointsList.CONTACT_BY_ID, id, payload)) as IContact;
};

export const removeContactById = async (id: string): Promise<IContact> => {
  return await removeDataItemById(EndpointsList.CONTACT_BY_ID, id);
};
