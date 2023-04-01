import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  save: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        image: z.string(),
        latitude: z.number(),
        longtitude: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      });

      return post;
    }),
});
