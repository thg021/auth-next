import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export type LoginSchemaProps = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export type RegisterSchemaProps = z.infer<typeof RegisterSchema>;
