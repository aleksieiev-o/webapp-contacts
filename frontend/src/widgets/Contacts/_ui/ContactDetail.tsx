import { FC, ReactElement } from 'react';

interface Props {
  detailTitle: string;
  detail?: string;
}

const ContactDetail: FC<Props> = (props): ReactElement => {
  const { detailTitle, detail } = props;

  return (
    <div className="w-full flex flex-row flex-nowrap items-center justify-start gap-2 overflow-hidden">
      <span className="font-bold whitespace-nowrap">{detailTitle}:</span>

      {detail ? (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap" title={detail}>
          {detail}
        </span>
      ) : (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">Detail is not defined</span>
      )}
    </div>
  );
};

export default ContactDetail;
