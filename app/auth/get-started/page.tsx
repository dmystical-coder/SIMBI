"use client";

import { useState } from "react";
import { Button, Flex, Input, Stack, Text, Separator } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AuthLayout } from "@/components/ui/auth-layout";
import { register } from "@/lib/auth";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function GetStartedPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3 || formData.username.length > 30) {
      newErrors.username = "Username must be 3-30 characters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = "Username must be alphanumeric only";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(formData);

      // Refresh auth context with new user data
      refreshAuth();

      toaster.create({
        title: "Registration Successful",
        description: response.message || "Your account has been created!",
        type: "success",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toaster.create({
        title: "Registration Failed",
        description: message || "Unable to create account. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toaster.create({
      title: "Coming Soon",
      description: "Google sign-in will be available soon",
      type: "info",
    });
  };

  return (
    <AuthLayout
      title="Get started with"
      subtitle="SIMBI"
      illustration="/simbi-nodding.svg"
      illustrationAlt="SIMBI character nodding"
    >
      <Stack gap={{ base: 4, lg: 3 }} as="form" onSubmit={handleSubmit}>
        <Text
          fontSize={{ base: "18px", lg: "20px" }}
          fontWeight="500"
          letterSpacing="-0.60px"
          color="dark.950"
          fontFamily="var(--font-poppins)"
        >
          Enter your Details
        </Text>

        <Stack gap={{ base: 4, lg: 4 }}>
          <Field.Root invalid={!!errors.username}>
            <Input
              name="username"
              placeholder="Username (3-30 characters)"
              value={formData.username}
              onChange={handleInputChange}
              size={{ base: "md", lg: "md" }}
              h={{ base: "44px", lg: "48px" }}
              borderRadius="8px"
              borderColor="subtle.300"
              fontSize="14px"
              fontFamily="var(--font-poppins)"
              color="dark.950"
              _placeholder={{
                color: "dark.950",
                opacity: 0.5,
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px {colors.brand.500}",
              }}
            />
            {errors.username && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.username}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.firstName}>
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              size={{ base: "md", lg: "md" }}
              h={{ base: "44px", lg: "48px" }}
              borderRadius="8px"
              borderColor="subtle.300"
              fontSize="14px"
              fontFamily="var(--font-poppins)"
              color="dark.950"
              _placeholder={{
                color: "dark.950",
                opacity: 0.5,
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px {colors.brand.500}",
              }}
            />
            {errors.firstName && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.firstName}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.lastName}>
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              size={{ base: "md", lg: "md" }}
              h={{ base: "44px", lg: "48px" }}
              borderRadius="8px"
              borderColor="subtle.300"
              fontSize="14px"
              fontFamily="var(--font-poppins)"
              color="dark.950"
              _placeholder={{
                color: "dark.950",
                opacity: 0.5,
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px {colors.brand.500}",
              }}
            />
            {errors.lastName && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.lastName}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              size={{ base: "md", lg: "md" }}
              h={{ base: "44px", lg: "48px" }}
              borderRadius="8px"
              borderColor="subtle.300"
              color="dark.950"
              fontSize="14px"
              fontFamily="var(--font-poppins)"
              _placeholder={{
                color: "dark.950",
                opacity: 0.5,
                fontSize: "14px",
              }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px {colors.brand.500}",
              }}
            />
            {errors.email && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.email}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Stack
              width="100%"
              borderRadius="8px"
              border="1px solid"
              borderColor={errors.password ? "red.500" : "subtle.300"}
              p={{ base: "10px 12px", lg: "12px 16px" }}
              gap={1}
              _focusWithin={{
                borderColor: errors.password ? "red.500" : "brand.500",
                boxShadow: errors.password
                  ? "0 0 0 1px {colors.red.500}"
                  : "0 0 0 1px {colors.brand.500}",
              }}
            >
              <Text
                fontSize="10px"
                fontWeight="400"
                color="state.500"
                fontFamily="var(--font-poppins)"
              >
                Password
              </Text>
              <Input
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                border="none"
                p={0}
                h="auto"
                minH="unset"
                fontSize="12.95px"
                fontFamily="var(--font-poppins)"
                color="dark.950"
                _placeholder={{
                  color: "dark.950/46",
                }}
                _focus={{ boxShadow: "none", outline: "none" }}
              />
            </Stack>
            {errors.password && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.password}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.confirmPassword}>
            <Stack
              width="100%"
              borderRadius="8px"
              border="1px solid"
              borderColor={errors.confirmPassword ? "red.500" : "subtle.300"}
              p={{ base: "10px 12px", lg: "12px 16px" }}
              gap={1}
              _focusWithin={{
                borderColor: errors.confirmPassword ? "red.500" : "brand.500",
                boxShadow: errors.confirmPassword
                  ? "0 0 0 1px {colors.red.500}"
                  : "0 0 0 1px {colors.brand.500}",
              }}
            >
              <Text
                fontSize="10px"
                fontWeight="400"
                color="state.500"
                fontFamily="var(--font-poppins)"
              >
                Confirm Password
              </Text>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                border="none"
                p={0}
                h="auto"
                minH="unset"
                fontSize="12.95px"
                fontFamily="var(--font-poppins)"
                color="dark.950"
                _placeholder={{
                  color: "dark.950/46",
                }}
                _focus={{ boxShadow: "none", outline: "none" }}
              />
            </Stack>
            {errors.confirmPassword && (
              <Field.ErrorText fontSize="12px" color="red.500">
                {errors.confirmPassword}
              </Field.ErrorText>
            )}
          </Field.Root>
        </Stack>

        <Button
          type="submit"
          bg="brand.500"
          color="#FDFDFF"
          fontSize={{ base: "14px", lg: "16px" }}
          fontWeight="500"
          borderRadius="8px"
          h={{ base: "44px", lg: "48px" }}
          w="full"
          fontFamily="var(--font-poppins)"
          _hover={{ bg: "brand.600" }}
          _active={{ bg: "brand.700" }}
          mt={{ base: 2, lg: 1 }}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Continue"}
        </Button>

        <Flex align="center" gap={6} my={{ base: 2, lg: 1 }}>
          <Separator flex="1" borderColor="rgba(102, 102, 102, 0.25)" />
          <Text
            fontSize="14px"
            fontWeight="400"
            color="#666666"
            fontFamily="var(--font-poppins)"
          >
            OR
          </Text>
          <Separator flex="1" borderColor="rgba(102, 102, 102, 0.25)" />
        </Flex>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          borderColor="subtle.300"
          borderRadius="8px"
          h={{ base: "44px", lg: "48px" }}
          w="full"
          fontSize={{ base: "14px", lg: "16px" }}
          fontWeight="400"
          color="brand.500"
          fontFamily="var(--font-poppins)"
          _hover={{ bg: "brand.500/5" }}
        >
          <Flex align="center" gap={2}>
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            <Text>Continue with Google</Text>
          </Flex>
        </Button>

        <Text
          fontSize="12px"
          fontWeight="400"
          color="#4976F4"
          textAlign="center"
          mt={{ base: 2, lg: 1 }}
          fontFamily="var(--font-poppins)"
        >
          <Link href="/auth/sign-in" style={{ textDecoration: "none" }}>
            Already Have an Account ?
          </Link>
        </Text>
      </Stack>
    </AuthLayout>
  );
}
