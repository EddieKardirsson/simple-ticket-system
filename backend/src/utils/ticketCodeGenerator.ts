import db from "../config/database.ts";

const generateSegment = (): string => {
  return Math.floor(Math.random() * 0x10000)
    .toString(16)
    .padStart(4, "0")
    .toUpperCase();
}

const generateCode = (): string => {
  return `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
}

const codeExists = (code: string): boolean => {
  const row = db
    .query<{ id: number }, [string]>("SELECT id FROM tickets WHERE code = ?")
    .get(code);

  return row !== null;
};

export const generateUniqueTicketCode = (): string => {
  let code: string;

  do {
    code = generateCode();
  } while (codeExists(code));

  return code;
};