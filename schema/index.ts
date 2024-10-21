import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export type LoginSchemaProps = z.infer<typeof LoginSchema>;

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
});

export type ResetSchemaProps = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
  passwordConfirmation: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export type NewPasswordSchemaProps = z.infer<typeof NewPasswordSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export type RegisterSchemaProps = z.infer<typeof RegisterSchema>;
