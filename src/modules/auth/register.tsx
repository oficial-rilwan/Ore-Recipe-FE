import React from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import PATHNAMES from "../../constants/pathnames";
import { Logo } from "../../components/Header";
import { useMutation } from "@tanstack/react-query";
import userRepo from "../../repo/user.repo";
import { UserProps } from "../../types/types";
import { AuthContext } from "../../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Form } from "react-bootstrap";
import { IoReload } from "react-icons/io5";
import { useToast } from "../../hooks/useToast";
import { FormHelperText } from "./signin";

const defaultValues = { email: "", password: "", firstName: "", lastName: "" };

const schema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(6).max(55).required().label("Password"),
});

const Register = () => {
  const navigate = useNavigate();
  const { message, triggerToast } = useToast();
  const { setUser } = React.useContext(AuthContext);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const errors = formState.errors;

  const mutation = useMutation({
    mutationFn: (data: UserProps) => userRepo.register(data),
    onSuccess: ({ data }) => {
      setUser(data);
      navigate(PATHNAMES.HOME);
    },
    onError: (error: any) => triggerToast(error?.response?.data?.error),
  });

  const save = (data: UserProps) => {
    mutation.mutate(data);
  };
  return (
    <div>
      <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
        <div className="w-100 p-4">
          <div className="d-flex justify-content-center">
            <Logo />
          </div>

          <div className="d-flex justify-content-center">
            <Form className="login_form" onSubmit={handleSubmit(save)}>
              <div className="fs-4 fw-semibold text-center">Get Started</div>
              <div className="text-center">Wecome to Ore Recipe - Let's create your account</div>
              <div className="border my-3 mb-5"></div>

              {!message ? null : <Alert variant="danger">{message}</Alert>}

              <div className="row">
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-0">First Name *</Form.Label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => <Form.Control type="text" className="form_input" {...field} />}
                    />
                    <FormHelperText error={errors?.email?.message} />
                  </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-0">Last Name *</Form.Label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => <Form.Control type="text" className="form_input" {...field} />}
                    />
                    <FormHelperText error={errors?.email?.message} />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label className="mb-0">Email *</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Form.Control type="email" className="form_input" {...field} />}
                />
                <FormHelperText error={errors?.email?.message} />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label className="mb-0">Password *</Form.Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Form.Control type="password" className="form_input" {...field} />}
                />
                <FormHelperText error={errors?.password?.message} />
              </Form.Group>
              <div>
                <button className="primary_btn" type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? <IoReload className="me-2 btn_loader animate-spin" /> : null} Sign Up
                </button>
              </div>
              <div className="text-center my-3">
                Already have an account?{" "}
                <Link to={PATHNAMES.AUTH} className="primary_color fw-semibold">
                  Sign In
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
