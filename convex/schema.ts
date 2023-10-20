import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
        favouriteIds: v.optional(v.id('films')),
        reviews: v.optional(v.array(v.id('reviews')))
    }).index("by_token", ["tokenIdentifier"]),

    films: defineTable({
        title: v.string(),
        cover_url: v.string(),
        video_url: v.string(),
        description: v.optional(v.string()),
        reviews: v.optional(v.array(v.id('review'))),
        genre: v.string(),
        duration: v.number(),
        rating: v.optional(v.number())
    }).index('by_genre', ['genre']).index('by_rating', ['rating']).index('by_duration', ['duration'])
    ,
    reviews: defineTable({
        userId: v.id('users'),
        stars: v.union(
            v.literal(1),
            v.literal(2),
            v.literal(3),
            v.literal(4),
            v.literal(5)
        ),
        content: v.optional(v.string()),
    }).index('by_stars', ['stars'])
});