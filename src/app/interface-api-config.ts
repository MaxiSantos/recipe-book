import { IApiService } from './interface-service';

// export class IApiConfig {
//   constructor(
//     public url: string,
//     public service: IApiService,
//     public sourceKey: string
//   ){ }

//   public map(): void {

//   }
// }

export interface IApiConfig {
  url: string;
  service: IApiService;
  sourceKey: string;
  forceCall?: boolean
  map?(): void
}
