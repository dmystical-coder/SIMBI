"use client";

import { Button, Spinner } from "@chakra-ui/react";
import { ReactNode, ComponentProps } from "react";

interface LoadingButtonProps extends Omit<ComponentProps<typeof Button>, 'loading'> {
  loading?: boolean;
  children: ReactNode;
}

export default function LoadingButton({
  loading = false,
  children,
  onClick,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={loading || disabled}
      opacity={loading ? 0.7 : 1}
      cursor={loading ? "not-allowed" : "pointer"}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" mr={2} />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
