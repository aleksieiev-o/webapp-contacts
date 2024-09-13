import Contacts from '@/widgets/Contacts/Contacts';
import UpdateContact from '@/widgets/UpdateContact/UpdateContact';
import CreateContact from '@/widgets/CreateContact/CreateContact';
import Home from '@/widgets/Home/Home';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export enum ERouter {
  HOME = '/',
  CONTACTS = '/contacts',
  CONTACTS_CREATE = '/contacts/create',
  CONTACTS_UPDATE = '/contacts/update/:id',
  NOT_FOUND = '*',
}

export enum ERouterTitle {
  HOME = 'Home',
  CONTACTS = 'Contacts',
  CONTACTS_CREATE = 'Create contact',
  CONTACTS_UPDATE = 'Update contact',
  NOT_FOUND = 'Page not found',
}

export const router = createBrowserRouter([
  { path: ERouter.HOME, element: <Home /> },
  { path: ERouter.CONTACTS, element: <Contacts /> },
  { path: ERouter.CONTACTS_CREATE, element: <CreateContact /> },
  { path: ERouter.CONTACTS_UPDATE, element: <UpdateContact /> },
  {
    path: ERouter.NOT_FOUND,
    element: <Navigate to={ERouter.HOME} replace={true} />,
  },
]);
