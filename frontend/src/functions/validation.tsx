"use client";
import { useState } from "react";
type Props = {
  formData: {
    email: string | number;
    password: string | number;
    confirmPassword: string | number;
  };
  setFormData: (data: any) => any;
};
const Validation = ({ formData, setFormData }: Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.toString().trim()) {
      newErrors.email = "First name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validation2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password.toString().trim()) {
      newErrors.password = "Last name is required";
    }

    if (!formData.confirmPassword.toString().trim()) {
      newErrors.confirmPassword = "Username is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
};
export default Validation;
