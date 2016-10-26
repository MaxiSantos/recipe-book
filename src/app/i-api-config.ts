import { IApiService } from './i-api-service';

export interface IApiConfig {
  url: string;
  service: IApiService;
  sourceKey: string;
  map?([]:any);
}
