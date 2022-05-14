import { response, context } from 'msw';

export const res = (...transformers: any) => {
  // A custom response composition chain that embeds
  // a random realistic server response delay to each `res()` call.
  return response(...transformers, context.delay());
};
