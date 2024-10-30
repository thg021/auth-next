import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/services/verification-token";
import { v4 as uuidV4 } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordByToken } from "@/services/reset-password";

//TODO: mover esta função para utils talvez
/**
 * Retorna a data e hora de expiração com base no tempo atual e em segundos adicionais especificados.
 *
 * Esta função calcula a data e hora de expiração somando um número específico de segundos
 * ao horário atual. Caso nenhum valor seja fornecido, utiliza um valor padrão de 1 hora (3600 segundos).
 *
 * @param {number} [second=3600] - O número de segundos a serem adicionados ao horário atual.
 * @returns {Date} - Data e hora de expiração calculada.
 */
const getExpireDate = (second: number = 3600): Date =>
  new Date(new Date().getTime() + second * 1000);

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = getExpireDate(5 * 60);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expires = getExpireDate();

  const existingToken = await getResetPasswordByToken(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();

  const expires = getExpireDate();

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return verificationToken;
};
