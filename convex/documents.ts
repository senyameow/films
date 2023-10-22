import { v } from "convex/values";
import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";


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

export const movieList = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        const movies = await ctx.db
            .query('films')
            .withIndex('by_rating')
            .order('desc')
            .paginate(args.paginationOpts)
        return movies;
    },
});

export const movie = query({
    args: {
        id: v.optional(v.id('films'))
    },
    handler: (ctx, args) => {

        const movie = ctx.db.get(args.id!)
        return movie
    }
})