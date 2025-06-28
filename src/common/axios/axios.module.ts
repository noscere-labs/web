import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { CorrelationModule } from '@tokenovate/logger';

import { AxiosService, CustomAxiosRequestConfig } from './axios.service';

export const AXIOS_CONFIG = 'AXIOS_CONFIG';

export type ModuleAsyncOptions<Options> = Pick<FactoryProvider<Options>, 'inject' | 'useFactory'>;

@Module({
  imports: [CorrelationModule],
})
export class AxiosModule {
  static forFeature(serviceName: string, options: CustomAxiosRequestConfig): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_CONFIG,
          useValue: options,
        },
        {
          provide: serviceName,
          useClass: AxiosService,
        },
      ],
      exports: [serviceName],
    };
  }

  static forFeatureAsync(
    serviceName: string,
    options: ModuleAsyncOptions<CustomAxiosRequestConfig>
  ): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_CONFIG,
          ...options,
        },
        {
          provide: serviceName,
          useClass: AxiosService,
        },
      ],
      exports: [serviceName],
    };
  }

  static forRoot(options: CustomAxiosRequestConfig): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_CONFIG,
          useValue: options,
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }

  static forRootAsync(options: ModuleAsyncOptions<CustomAxiosRequestConfig>): DynamicModule {
    return {
      module: AxiosModule,
      providers: [
        {
          provide: AXIOS_CONFIG,
          ...options,
        },
        AxiosService,
      ],
      exports: [AxiosService],
    };
  }
}
