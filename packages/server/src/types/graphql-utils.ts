import * as express from "express";
import { Redis } from "ioredis";
import { userLoader } from "../loaders/UserLoader";
import { RedisPubSub } from "graphql-redis-subscriptions";

export interface Session extends Express.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
  res: express.Response;
  userLoader: ReturnType<typeof userLoader>;
  pubsub: RedisPubSub;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
