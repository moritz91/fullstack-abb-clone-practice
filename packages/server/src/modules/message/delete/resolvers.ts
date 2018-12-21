import { ResolverMap } from "../../../types/graphql-utils";
import { Message } from "../../../entity/Message";
// import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteMessage: async (_, { message }, { session }) => {
      return await Message.delete({
        ...message,
        userId: session.userId
      });
    }
  }
};
