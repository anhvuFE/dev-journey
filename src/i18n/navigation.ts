import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link / router / pathname có nhận thức về locale
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
