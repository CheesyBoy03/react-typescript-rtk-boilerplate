import { FilmsApiService } from './filmsApi';
import { requestHeaders } from './shared/requests';

export const filmsApiService = new FilmsApiService({
  headers: requestHeaders,
});
