import { strHasLength } from "./strings";

export const isLoggedin = (userEmail: string | undefined, userUUID: string | undefined): boolean => strHasLength(userEmail) && strHasLength(userUUID);
