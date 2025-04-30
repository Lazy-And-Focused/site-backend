const ROUTES = {
  GET_ALL: "/",
  GET_ONE: "/:username"
} as const;

const ROUTER = "/members" as const;

export {
  ROUTER, ROUTES
};