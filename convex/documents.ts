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

export const getRandomFilm = query({
    handler: async (ctx) => {
        const films = await ctx.db.query('films').take(1)
        return films[0]
    }
})