import { Toast, ToastContainer } from "react-bootstrap";

interface ToastMessageProps {
  show: boolean;
  message: string;
  type?: string;
}

const ToastMessage = ({ show, message, type }: ToastMessageProps) => (
  <ToastContainer position="top-end" className="p-3">
    <Toast show={show} bg={type}>
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default ToastMessage;
