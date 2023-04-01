import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  save: protectedProcedure
    .input(z.object({ title: z.string(), image: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          image: input.image,
          authorId: ctx.session.user.id,
        },
      });

      return post.id;
    }),
});
