"use client";

import { useState } from "react";
import { Button, Flex, Input, Stack, Text, Separator } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AuthLayout } from "@/components/ui/auth-layout";
import { login } from "@/lib/auth";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      const response = await login(formData);

      // Refresh auth context with new user data
      refreshAuth();

      toaster.create({
        title: "Login Successful",
        description: response.message || "Welcome back!",
        type: "success",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      toaster.create({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
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
      title="Welcome back to"
      subtitle="SIMBI"
      illustration="/simbi-waving.svg"
      illustrationAlt="SIMBI character waving"
    >
      <Stack gap={{ base: 4, lg: 3 }} as="form" onSubmit={handleSubmit}>
        <Text
          fontSize={{ base: "18px", lg: "20px" }}
          fontWeight="500"
          letterSpacing="-0.60px"
          color="brand.700"
          fontFamily="var(--font-poppins)"
        >
          Sign In
        </Text>

        <Stack gap={{ base: 4, lg: 5 }}>
          <Field.Root invalid={!!errors.email}>
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              size="md"
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
                  color: "rgba(30, 30, 47, 0.46)",
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

          <Text
            fontSize="12px"
            fontWeight="400"
            color="#4976F4"
            cursor="pointer"
            fontFamily="var(--font-poppins)"
            _hover={{ textDecoration: "underline" }}
          >
            <Link href="/auth/get-started" style={{ textDecoration: "none" }}>
              Don&apos;t have an account?
            </Link>
          </Text>
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
          mt={{ base: 3, lg: 2 }}
          fontFamily="var(--font-poppins)"
          _hover={{ bg: "brand.600" }}
          _active={{ bg: "brand.700" }}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Continue"}
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
            <Text>Login with Google</Text>
          </Flex>
        </Button>
      </Stack>
    </AuthLayout>
  );
}
