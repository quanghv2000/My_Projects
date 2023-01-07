import { Fragment } from 'react';
import 'app/components/room-receive-notification/style.scss';

export const RoomReceiveNotification: React.FC<any> = () => {
  // const { t } = useTranslation();
  return (
    <Fragment>
      <div
        className="roomReceiveNotification__container"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up" style={{ fontSize: 18 }}></i>
      </div>
    </Fragment>
  );
};
