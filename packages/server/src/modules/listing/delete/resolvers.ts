import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { Message } from "../../../entity/Message";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      const listing = await Listing.findOne({ where: { id } });
      const listingMessages = await Message.find({ where: { listingId: id } });

      await Message.remove(listingMessages);

      if (!listing) {
        throw new Error("does not exist");
      }

      if (session.userId !== listing.userId) {
        console.log(
          `this user ${
            session.userId
          } is trying to delete a listing he doesn't own.`
        );
        throw new Error("not authorized");
      }

      await Listing.remove(listing);

      // // with cache
      // const listings = await redis.lrange(listingCacheKey, 0, -1);
      // const idx = await listings.findIndex((x: string) => {
      //   // parse what's stored in redis, get it's string value x and compare it to the listingId
      //   JSON.parse(x).id === id;
      // });
      // // fix below line to remove cache singleton?
      // // await redis.lset(listingCacheKey, idx, null);

      return true;
    }
  }
};
