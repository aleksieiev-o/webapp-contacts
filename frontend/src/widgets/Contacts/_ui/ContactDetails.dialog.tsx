import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Button } from '@/components/shadcn/ui/button';
import { Pencil, SquareUser } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { IContact } from '@/shared/types/Contact';
import ContactDetail from './ContactDetail';
import { Badge } from '@/components/shadcn/ui/badge';
import { parseDate } from '@/shared/utils/parceDate';
import { Link } from 'react-router-dom';
import { ERouter } from '@/shared/router';
import { useMemo } from 'react';

interface Props<TData> {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  row: Row<TData>;
}

const ContactDetailsDialog = <TData,>(props: Props<TData>) => {
  const { dialogIsOpen, setDialogIsOpen, row } = props;
  const { id, lastName, firstName, street, houseNumber, city, postalCode, phones, createdDate, updatedDate } = row.original as IContact;

  const updateContactLink = useMemo(() => {
    const pathname = ERouter.CONTACTS_UPDATE.split(':')[0];
    return `${pathname}${id}`;
  }, [id]);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" title="Contact details">
          <SquareUser className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Contact details</DialogTitle>

          <DialogDescription>
            Here you can see details of the contact <br />
            <span className="font-bold">{id}</span>
          </DialogDescription>
        </DialogHeader>

        <section className="w-full flex flex-col items-center justify-start gap-4 overflow-y-auto">
          <ContactDetail detailTitle="Last name" detail={lastName} />
          <ContactDetail detailTitle="First name" detail={firstName} />
          <ContactDetail detailTitle="Street" detail={street} />
          <ContactDetail detailTitle="House number" detail={houseNumber} />
          <ContactDetail detailTitle="City" detail={city} />
          <ContactDetail detailTitle="Postal code" detail={postalCode} />
          <ContactDetail detailTitle="Created at" detail={parseDate(createdDate)} />
          <ContactDetail detailTitle="Updated at" detail={parseDate(updatedDate)} />

          <div className="w-full flex flex-col items-start justify-start gap-4 overflow-hidden">
            <span className="font-bold">Phones:</span>

            {phones.length > 0 ? (
              <div className="w-full flex flex-row flex-wrap items-center justify-start gap-2 overflow-y-auto">
                {phones.map((item, idx) => (
                  <Badge key={`${idx}_${item.phone}`} variant="info" title={item.phone}>
                    {item.phone}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">Phones are not defined</span>
            )}
          </div>
        </section>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Link to={updateContactLink}>
            <Button variant={'default'} title="Update contact" className="gap-4">
              <Pencil className="h-5 w-5" />
              <span>Update</span>
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsDialog;
