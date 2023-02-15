import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { fetchRates } from "./rates";

type Context = inferAsyncReturnType<typeof createContext>;
export type AppRouter = typeof appRouter;

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
const router = t.router;

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});

const appRouter = router({
  rates: publicProcedure.query(() => fetchRates()),
});

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use("/", express.static("../client/dist"));

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
