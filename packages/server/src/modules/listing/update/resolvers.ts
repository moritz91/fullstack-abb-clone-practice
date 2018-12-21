import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { processUpload } from "../shared/processUpload";
import { getConnection } from "typeorm";
import { listingCacheKey } from "../../../constants";
// import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (
      _,
      { listingId, input: { picture, ...data } },
      { redis }
    ) => {
      // isAuthenticated(session);

      // const pictureUrl = picture ? await processUpload(picture) : null;
      // 1. user uploads new picture
      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }

      // 2. user removes picture
      // 3. do nothing

      // Updating
      // w/o cache
      // await Listing.update(
      //   { id: listingId },
      //   {
      //     ...data
      //   }
      // );

      // with cache
      const {
        raw: [newListing]
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set(data)
        .where("id = :id", { id: listingId })
        .returning("*")
        .execute();
      const listings = await redis.lrange(listingCacheKey, 0, -1);
      const idx = await listings.findIndex((x: string) => {
        // parse what's stored in redis, get it's string value x and compare it to the listingId
        JSON.parse(x).id === listingId;
      });
      await redis.lset(listingCacheKey, idx, JSON.stringify(newListing));

      return true;
    }
  }
};
