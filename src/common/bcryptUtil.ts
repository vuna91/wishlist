import { compare, hash } from "bcrypt";

const hashPass = async (password: string) => await hash(password, 10);

const isValidPass = async (password: string, hash: string) => await compare(password, hash);

export default {
  hashPass,
  isValidPass
}