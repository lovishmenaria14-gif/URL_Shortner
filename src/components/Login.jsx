import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "../hooks/Use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";
import { login } from "../db/apiAuth";


const Login = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");
  const createNew = searchParams.get("createNew");

  const { fetchUser } = UrlState();

  const {
    data,
    error,
    loading,
    fn: fnLogin,
  } = useFetch(login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    const handleRedirect = async () => {
      if (!data) return;

      await fetchUser();

      if (redirect) {
        navigate(redirect, { replace: true });
      } else if (createNew) {
        navigate(
          `/Dashboard?createNew=${encodeURIComponent(createNew)}`,
          { replace: true }
        );
      } else {
        navigate("/Dashboard", { replace: true });
      }
    };

    handleRedirect();
  }, [data, redirect, createNew, fetchUser, navigate]);

  const handleLogin = async () => {
    setErrors({});

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await fnLogin(formData);
    } catch (e) {
      if (e.inner) {
        const newErrors = {};

        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>

        <CardDescription>
          Login to your account if you already have one.
        </CardDescription>

        {error && <Error message={error} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />

          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <BeatLoader size={8} color="#ffffff" />
          ) : (
            "Login"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;