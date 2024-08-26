import { IContact } from '@/shared/types/Contact';
import { fetchAllData, fetchDataItemById } from '../_db.service';
import { EndpointsList } from '@/shared/Endpoints.enum';

export const fetchAllContacts = async (): Promise<IContact[]> => {
  return await fetchAllData<IContact>(EndpointsList.CONTACTS);
};

export const fetchContactById = async (id: string): Promise<IContact> => {
  return await fetchDataItemById<IContact>(EndpointsList.CONTACT_BY_ID, id);
};
