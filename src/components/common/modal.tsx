import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { TOGGLE_MODAL } from '~/graphql/mutations';

declare global {
  interface Window {
    bootstrap: any;
  }
}

type ModalProps = {
  children: any;
  title?: string;
  open?: boolean;
  onHide?: () => void;
  onShow?: () => void;
};

export default function Modal(props: ModalProps) {
  const [toggleModal] = useMutation(TOGGLE_MODAL);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const modal = document.getElementById('modal');

    modal.addEventListener('hide.bs.modal', () => {
      toggleModal({
        variables: {
          open: false,
        },
      });

      if (props.onHide) {
        props?.onHide();
      }
    });

    modal.addEventListener('show.bs.modal', props.onShow);

    setModal(
      new window.bootstrap.Modal(modal, {
        keyboard: true,
      })
    );
  }, []);

  useEffect(() => {
    if (modal) {
      props.open ? modal.show() : modal.hide();
    }
  }, [props.open]);

  const { children, title = '' } = props;
  return (
    <div id="modal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {title && <h5 className="font-weigh-bold modal-title">{title}</h5>}
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
