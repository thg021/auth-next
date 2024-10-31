"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardLogin } from "@/components/auth/card-login";
import { ResetSchema, type ResetSchemaProps } from "@/schema";

import type { FormStatusProps } from "@/utils/formStatus.type";

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
import { resetActions } from "@/actions/reset";

export const ResetForm = () => {
  const [statusMessage, setStatusMessage] = useState<FormStatusProps>({
    status: null,
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetSchemaProps>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetSchemaProps) => {
    startTransition(() => {
      resetActions(values).then((data) => {
        setStatusMessage(data);
      });
    });
  };

  return (
    <CardLogin.Root>
      <CardLogin.Header title="Autenticação" subText="Solicitar nova senha" />
      <CardLogin.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-2">
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
              </div>
            </div>
            {statusMessage &&
              (statusMessage.status === "error" ? (
                <FormError message={statusMessage.message} />
              ) : (
                <FormSuccess message={statusMessage.message} />
              ))}

            <Button className="w-full" type="submit">
              {isPending && <CgSpinner className="animate-spin h-5 w-5 mr-3" />}
              Enviar e-mail
            </Button>
          </form>
        </Form>
      </CardLogin.Content>
      <CardLogin.Footer>
        <BackButton label="Voltar ao login" href="/auth/login" />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
