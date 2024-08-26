import Contacts from '@/widgets/Contacts/Contacts';
import Home from '@/widgets/Home/Home';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export enum ERouter {
  HOME = '/',
  CONTACTS = '/contacts',
  CONTACTS_CREATE = '/contacts/create',
  NOT_FOUND = '*',
}

export enum ERouterTitle {
  HOME = 'Home',
  CONTACTS = 'Contacts',
  CONTACTS_CREATE = 'Create contact',
  NOT_FOUND = 'Page not found',
}

export const router = createBrowserRouter([
  { path: ERouter.HOME, element: <Home /> },
  { path: ERouter.CONTACTS, element: <Contacts /> },
  // {path: ERouter.CONTACTS_CREATE, element: <ContactsCreate />},
  {
    path: ERouter.NOT_FOUND,
    element: <Navigate to={ERouter.HOME} replace={true} />,
  },
]);
