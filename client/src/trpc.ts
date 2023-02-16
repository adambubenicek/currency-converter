import { createTRPCReact } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server";
export const trpc = createTRPCReact<AppRouter>();

export type TRPCOutputs = inferRouterOutputs<AppRouter>;
