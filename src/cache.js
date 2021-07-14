import { InMemoryCache, Reference, makeVar } from '@apollo/client';


// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const  isLoggedInVar = makeVar(!!localStorage.getItem("user"));

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          },
        }
      }
    }
  });