"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { CgSpinner } from "react-icons/cg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, type LoginSchemaProps } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { loginActions } from "@/actions/login";
import type { StatusForm } from "@/utils/statusForm.types";

export const LoginForm = () => {
  const [statusMessage, setStatusMessage] = useState<StatusForm>({
    status: null,
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchemaProps) => {
    startTransition(() => {
      loginActions(values).then((data) => setStatusMessage(data));
    });
  };

  return (
    <CardWrapper
      headerLabel="Bem-vindo de volta"
      backButtonLabel="Você ainda não tem conta?"
      backButtonHref="/auth/register"
      showSocial
    >
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

          <Button className="w-full" type="submit">
            {isPending && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
