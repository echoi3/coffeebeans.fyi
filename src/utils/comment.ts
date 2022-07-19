import { BeanContent } from "src/types/beanContent";
import { strHasLength } from "./strings";

export const hasAlreadyCommented = (userEmail: string | undefined, beanContent: BeanContent): boolean => beanContent?.commentedUsers?.includes(userEmail as string) as boolean;
