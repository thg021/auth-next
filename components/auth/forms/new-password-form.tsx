"use client";
import { useRouter } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { CardLogin } from "@/components/auth/card-login";
import { FormError } from "@/components/form-error";
import { Spinner } from "@/components/spinner";
import type { FormStatusProps } from "@/utils/formStatus.type";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { BackButton } from "../back-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, type NewPasswordSchemaProps } from "@/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { validationTokenPassword } from "@/actions/validation-token-password";
import { changePassword } from "@/actions/change-password";

export const NewPasswordForm = () => {
  const [statusMessage, setStatusMessage] = useState<FormStatusProps>({
    status: null,
  });
  const [userValidToken, setUserValidToken] = useState<{
    status: boolean;
    email?: string;
  }>({
    status: false,
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordSchemaProps>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = useCallback(
    async (values: NewPasswordSchemaProps) => {
      if (!userValidToken.email) return;

      startTransition(async () => {
        const data = await changePassword({
          email: userValidToken.email!,
          password: values.password,
        });

        setStatusMessage(data);
        if (data.status === "success") form.reset();
      });
    },
    [form, userValidToken.email]
  );

  const validationToken = useCallback(async () => {
    if (!token) return;
    const { status, email } = await validationTokenPassword(token || "");

    if (status !== "valid") {
      const statusToken = await newVerification(token);
      router.push(`/auth/login?isTokenVerified=${statusToken}`);
      return;
    }

    setUserValidToken({
      status: true,
      email,
    });
  }, [router, token]);

  useEffect(() => {
    validationToken();
  }, [validationToken]);

  const isMissingTokenUrl = !statusMessage.status && !token;
  const isLoadingTokenValidation =
    !userValidToken.status && !statusMessage.status && token;
  return (
    <CardLogin.Root>
      <CardLogin.Header title="Autenticação" subText="Nova senha" />

      {isMissingTokenUrl && (
        <CardLogin.Content className="flex items-center justify-center">
          <FormError message="Token de verificação não encontrado" />
        </CardLogin.Content>
      )}

      {isLoadingTokenValidation && (
        <CardLogin.Content className="flex items-center justify-center">
          <Spinner className="h-10 w-10" />
        </CardLogin.Content>
      )}

      <CardLogin.Content>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {userValidToken.status && (
              <div className="space-y-4">
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
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>repita sua senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {statusMessage &&
              (statusMessage.status === "error" ? (
                <FormError message={statusMessage.message} />
              ) : (
                <FormSuccess message={statusMessage.message} />
              ))}

            {userValidToken.status && (
              <Button className="w-full" type="submit">
                {isPending && <Spinner text="Carregando" />}
                <span
                  data-visible={isPending}
                  className="data-[visible=true]:hidden block "
                >
                  confirmar
                </span>
              </Button>
            )}
          </form>
        </Form>
      </CardLogin.Content>

      <CardLogin.Footer>
        <BackButton label="Voltar para login" href="/auth/login" />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
