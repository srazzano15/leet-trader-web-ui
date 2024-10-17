import { ModalProps } from "./types";
import './modal.css'


const Modal: React.FC<ModalProps> = ({children}) => {
  return (
    <div className="modal">
      { children }
    </div>
  );
};

export default Modal;
