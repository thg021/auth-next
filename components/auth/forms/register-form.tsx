"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema, type RegisterSchemaProps } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import type { FormStatusProps } from "@/utils/formStatus.type";
import { registerActions } from "@/actions/register";
import { Spinner } from "../../spinner";
import { CardLogin } from "@/components/auth/card-login";
import { BackButton } from "../back-button";

export const RegisterForm = () => {
  const [statusMessage, setStatusMessage] = useState<FormStatusProps>({
    status: null,
  });
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterSchemaProps>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterSchemaProps) => {
    startTransition(() => {
      registerActions(values).then((data) => setStatusMessage(data));
    });
  };

  return (
    <CardLogin.Root>
      <CardLogin.Header title="Autenticação" subText="Criar nova conta" />
      <CardLogin.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="nome"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              {isPending && <Spinner text="Carregando" />}
              <span
                data-visible={isPending}
                className="data-[visible=true]:hidden block "
              >
                criar usuário
              </span>
            </Button>
          </form>
        </Form>
      </CardLogin.Content>
      <CardLogin.Footer>
        <BackButton
          label="Você já tem conta? Faça o login"
          href="/auth/login"
        />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
