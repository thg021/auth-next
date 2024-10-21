"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardLogin } from "@/components/auth/card-login";
import { LoginSchema, type LoginSchemaProps } from "@/schema";

import { loginActions } from "@/actions/login";
import type { StatusForm } from "@/utils/statusForm.types";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "../back-button";
import { CgSpinner } from "react-icons/cg";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { FormTokenValidation } from "@/components/form-token-validation";

type TokenStatus = "invalid" | "valid" | "error" | null;
export const LoginForm = () => {
  const [statusMessage, setStatusMessage] = useState<StatusForm>({
    status: null,
  });
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const isTokenVerified: TokenStatus = searchParams.get("isTokenVerified");

  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchemaProps) => {
    startTransition(() => {
      loginActions(values).then((data) => {
        setStatusMessage(data);
        //TODO: implementar 2FA
      });
    });
  };

  return (
    <CardLogin.Root>
      <CardLogin.Header title="Autenticação" subText="teste" />
      <CardLogin.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="email@mail.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {statusMessage &&
              (statusMessage.status === "error" ? (
                <FormError message={statusMessage.message} />
              ) : (
                <FormSuccess message={statusMessage.message} />
              ))}

            {isTokenVerified && (
              <FormTokenValidation status={isTokenVerified} />
            )}
            <Button className="w-full" type="submit">
              {isPending && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
              Login
            </Button>
          </form>
        </Form>
      </CardLogin.Content>
      <CardLogin.Footer>
        <CardLogin.Social>
          <CardLogin.SocialButton icon={FcGoogle} provider="google" />
          {/* <CardLogin.SocialButton icon={FaGithub} provider="github" /> */}
        </CardLogin.Social>
      </CardLogin.Footer>
      <CardLogin.Footer>
        <BackButton
          label="Você ainda não tem conta? Clique aqui"
          href="/auth/register"
        />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
