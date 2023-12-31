import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";
import { useUser } from '@clerk/clerk-react'


export const getUser = query({
    args: {
        id: v.id('users'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id)
        return user
    }
})
export const getUserByEmail = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').withIndex('by_email').filter(q =>
            q.eq(q.field('email'), args.email)
        ).first()
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
    args: { paginationOpts: paginationOptsValidator, title: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let movies;
        if (!args.title) {
            movies = await ctx.db
                .query('films')
                .withIndex('by_rating')
                .order('desc')
                .paginate(args.paginationOpts)
        } else {
            movies = await ctx.db
                .query('films')
                .withSearchIndex('by_title_raiting', q =>
                    q.search('title', args.title!)
                )
                .paginate(args.paginationOpts)
        }

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

export const addFilm = mutation({
    args: {
        id: v.id('films'),
        userId: v.id('users')
    },
    handler: async (ctx, args) => {
        if (!args.userId) throw new Error('Unauthorized')
        // рандомный чувак не может просто доабвить у себе фильм
        const user = await ctx.db.get(args.userId)
        if (!user) throw new Error('User Not Found')
        const favourites = user.favouriteIds
        if (favourites?.includes(args.id)) return favourites
        if (favourites === undefined) {
            await ctx.db.patch(user?._id, {
                favouriteIds: [args.id]
            })
        } else {
            await ctx.db.patch(user?._id, {
                favouriteIds: [...favourites!, args.id]
            })
        }
        return favourites
    },
})
export const removeFilm = mutation({
    args: {
        id: v.id('films'),
        userId: v.optional(v.id('users'))
    },
    handler: async (ctx, args) => {
        if (!args.userId) throw new Error('Unauthorized')
        // рандомный чувак не может просто доабвить у себе фильм
        const user = await ctx.db.get(args.userId)
        if (!user) throw new Error('User Not Found')
        const favourites = user.favouriteIds
        await ctx.db.patch(user._id, {
            favouriteIds: favourites?.filter(id => id !== args.id)
        })
        return favourites
    },
})

export const searchByTitle = query({
    args: {
        title: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        // some validation
        const films = await ctx.db.query('films')
            .withSearchIndex('by_title_raiting', q =>
                q.search('title', args.title!)
            ).collect()

        return films
    }
})

export const getReviews = query({
    args: {
        filmId: v.id('films')
    },
    handler: async (ctx, args) => {
        const reviews = await ctx.db.query('reviews').withIndex('by_film_stars').filter(q => q.eq(q.field('filmId'), args.filmId)).order('desc').collect()
        return reviews
    }
})

export const relatedMovies = query({
    args: {
        genre: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query('films').withIndex('by_genre').take(4)
    }
})

export const changeReview = mutation({
    args: {
        id: v.id('reviews'),
        content: v.optional(v.string()),
        stars: v.optional(v.union(
            v.literal(1),
            v.literal(2),
            v.literal(3),
            v.literal(4),
            v.literal(5),
        )),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error('Unaithenticated')
        const review = await ctx.db.get(args.id)
        if (review === null) throw new Error('Not found')
        const { id, ...rest } = args
        const newReview = await ctx.db.patch(args.id, {
            ...rest
        })
        return newReview
    }
})
export const createReview = mutation({
    args: {
        userId: v.id('users'),
        filmId: v.id('films'),
        content: v.optional(v.string()),
        stars: v.optional(v.union(
            v.literal(1),
            v.literal(2),
            v.literal(3),
            v.literal(4),
            v.literal(5),
        )),
    },
    handler: async (ctx, args) => {
        if (!args.userId) throw new Error('Unauthorized')
        const review = await ctx.db.insert('reviews', {
            content: args.content,
            stars: args.stars!,
            userId: args.userId,
            filmId: args.filmId
        })
        return review
    }
})

export const allMovies = query({
    handler: async (ctx) => {
        return await ctx.db.query('films').collect()
    }
})