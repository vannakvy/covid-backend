import { InMemoryCache, Reference, makeVar } from '@apollo/client';


// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const  isUserVar = makeVar(!!localStorage.getItem("user"));

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isUser: {
            read() {
              return isUserVar();
            }
          },
  
        }
      }
    }
  });