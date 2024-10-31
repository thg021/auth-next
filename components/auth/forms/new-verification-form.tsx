"use client";
import { useRouter } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { CardLogin } from "@/components/auth/card-login";
import { FormError } from "@/components/form-error";
import { Spinner } from "@/components/spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BackButton } from "../back-button";

export const NewVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) return;
    const statusToken = await newVerification(token);
    router.push(`/auth/login?isTokenVerified=${statusToken}`);
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardLogin.Root>
      <CardLogin.Header
        title="Autenticação"
        subText="Confirmando seu cadastro"
      />
      <CardLogin.Content className="flex items-center justify-center">
        {!token ? (
          <FormError message="Token de verificação não encontrado" />
        ) : (
          <Spinner className="h-8 w-8" />
        )}
      </CardLogin.Content>
      <CardLogin.Footer>
        <BackButton label="Voltar para login" href="/auth/login" />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
