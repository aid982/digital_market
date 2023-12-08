import { ExpressContextType } from '@/server';
import { initTRPC } from '@trpc/server';
const t = initTRPC.context<ExpressContextType>().create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;