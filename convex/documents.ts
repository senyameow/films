import { v } from "convex/values";
import { query } from "./_generated/server";


export const getUser = query({
    args: {
        id: v.id('users')
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id)
        return user
    }
})