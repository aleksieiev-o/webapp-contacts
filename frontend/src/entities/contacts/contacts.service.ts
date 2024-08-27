import { IContact } from '@/shared/types/Contact';
import { fetchAllData, fetchDataItemById } from '../_db.service';
import { EndpointsList } from '@/shared/Endpoints.enum';

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

  return [];
};

export const fetchAllContacts = async (): Promise<IContact[]> => {
  const contacts = await fetchAllData<IContact>(EndpointsList.CONTACTS);
  return sortLastName(contacts, 'AZ');
};

export const fetchContactById = async (id: string): Promise<IContact> => {
  return await fetchDataItemById<IContact>(EndpointsList.CONTACT_BY_ID, id);
};