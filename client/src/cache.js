import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        dialogOpen: {
          read() {
            return dialogOpenVar();
          },
        },
      },
    },
  },
});

// Reactive variable to store dialog state
export const dialogOpenVar = cache.makeVar(false);
