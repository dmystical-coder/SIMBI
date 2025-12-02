"use client";

import { forwardRef, useState } from "react";
import { Input, IconButton, Group } from "@chakra-ui/react";
import { InputProps } from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export interface PasswordInputProps extends InputProps {
  rootProps?: React.ComponentProps<typeof Group>;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const { rootProps, ...rest } = props;
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
      <Group width="full" attached {...rootProps}>
        <Input {...rest} ref={ref} type={show ? "text" : "password"} flex="1" />
        <IconButton
          aria-label={show ? "Hide password" : "Show password"}
          onClick={handleClick}
          variant="ghost"
          size={rest.size}
        >
          {show ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      </Group>
    );
  }
);
