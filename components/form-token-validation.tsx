import { Cross1Icon, InfoCircledIcon, RocketIcon } from "@radix-ui/react-icons";

type FormTokenValidationProps = {
  status: "valid" | "invalid" | "error";
};

// TODO: melhorar este componente para fazer a validação do status
export const FormTokenValidation = ({ status }: FormTokenValidationProps) => {
  if (!status) return;

  return (
    <>
      {status === "valid" && (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
          <RocketIcon className="h-4 w-4" />
          <p>Seu acesso foi validado com sucesso</p>
        </div>
      )}
      {status === "invalid" && (
        <div className="bg-yellow-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-yellow-500">
          <InfoCircledIcon className="h-4 w-4" />
          <p>Token inválido.</p>
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
          <Cross1Icon className="h-4 w-4" />
          <p>Erro ao validar o token</p>
        </div>
      )}
    </>
  );
};
