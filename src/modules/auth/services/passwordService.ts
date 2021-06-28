import * as bcrypt from "bcrypt";

export const makePasswordHash = async (plainPassword: string) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(plainPassword, salt);
};

export const comparePasswords = async (
    plainPassword: string,
    passwordHash: string
) => await bcrypt.compare(plainPassword, passwordHash);
