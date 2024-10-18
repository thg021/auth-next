"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import type { ElementType } from "react";

type Provider = "google" | "github";

type CardLoginSocialButtonProps = {
  icon: ElementType;
  text?: string;
  provider: Provider;
};
export const CardLoginSocialButton = ({
  text,
  icon: Icon,
  provider,
}: CardLoginSocialButtonProps) => {
  const onLogin = (provider: Provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      size="lg"
      className="w-full"
      variant="outline"
      onClick={() => onLogin(provider)}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </Button>
  );
};
