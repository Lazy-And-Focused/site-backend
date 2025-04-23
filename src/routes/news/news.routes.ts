const ROUTES = {
  GET: "/"
} as const;

const QUERY = {
  GET: ["length", "offset"] as const
} as const;

const ROUTER = "news" as const;

export {
  ROUTER, ROUTES, QUERY
};