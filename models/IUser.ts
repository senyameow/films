import { Id } from "@/convex/_generated/dataModel";

export type IUser = {
    _id: Id<"users">;
    _creationTime: number;
    favouriteIds?: Id<"films">[] | undefined;
    reviews?: Id<"reviews">[] | undefined;
    name: string;
    tokenIdentifier: string;
} | null | undefined