import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Form, Modal } from "react-bootstrap";
import { UserProps } from "../types/types";
import { FormHelperText } from "../modules/auth/signin";
import { useToast } from "../hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import userRepo from "../repo/user.repo";
import { AuthContext } from "../context/AuthContext";
import ToastMessage from "./ToastMessage";
import { useNavigate } from "react-router-dom";
import PATHNAMES from "../constants/pathnames";
import { IoReload } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = Yup.object().shape({
  password: Yup.string().min(6).max(55).required().label("Password"),
});

const defaultValues = { password: "" };

const DeactivateAccountModal = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext);
  const { show, message, triggerToast, type } = useToast();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const errors = formState.errors;

  const handleSuccess = () => {
    setUser(null);
    triggerToast("Account deactivated successfully", "success");
    onClose();
    navigate(PATHNAMES.HOME, { replace: true });
  };

  const mutation = useMutation({
    mutationFn: (data: UserProps) => userRepo.deactivate(data),
    onSuccess: () => handleSuccess(),
    onError: (error: any) => triggerToast(error?.response?.data?.error),
  });

  const save = (data: UserProps) => {
    mutation.mutate(data);
  };
  return (
    <React.Fragment>
      <ToastMessage type={type} show={show} message={message} />
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(save)}>
            <p>To deactivate your account enter your password to continue.</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mb-0">Password *</Form.Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Form.Control type="password" {...field} />}
              />
              <FormHelperText error={errors?.password?.message} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit(save)}>
            {mutation.isPending ? <IoReload className="me-2 btn_loader animate-spin" /> : null} Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DeactivateAccountModal;
