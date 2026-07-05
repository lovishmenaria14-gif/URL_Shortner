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
import { signup } from "../db/apiAuth"; 

const Signup = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { fetchUser } = UrlState();
 

  const {
    data,
    error,
    loading,
    fn: fnSignup,
  } = useFetch(signup);

  useEffect(() => {
    if (data) {
      const loadUser = async () => {
        await fetchUser();

        navigate(
          `/Dashboard${
            longLink
              ? `?createNew=${encodeURIComponent(longLink)}`
              : ""
          }`
        );
      };

      loadUser();
    }
  }, [data, fetchUser, navigate, longLink]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSignup = async () => {
    setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),

        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),

        profile_pic: Yup.mixed().required(
          "Profile picture is required"
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await fnSignup(formData);
    } catch (e) {
      const newErrors = {};

      if (e.inner) {
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
        <CardTitle>Signup</CardTitle>

        <CardDescription>
          Create a new account if you haven't already.
        </CardDescription>

        {error && <Error message={error} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>

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

        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && (
            <Error message={errors.profile_pic} />
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSignup}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <BeatLoader size={8} color="#ffffff" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;