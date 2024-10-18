"use client";
import { useSearchParams } from "next/navigation";
import { CardLogin } from "@/components/auth/card-login";
import { BackButton } from "./back-button";

export const ErrorCard = () => {
  // TODO: verificar o tipo de erro para personalizar a mensagem auth/error?error=AccessDenied
  // precisa verificar todas as possibilidades de erro que o next Auth usa
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  return (
    <CardLogin.Root>
      <CardLogin.Header title="Autenticação" subText={urlError || ""} />
      <CardLogin.Footer>
        <BackButton label="Voltar" href="/auth/login" />
      </CardLogin.Footer>
    </CardLogin.Root>
  );
};
