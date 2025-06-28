import { Inject, Injectable, Logger } from '@nestjs/common';
import { CorrelationService, CorreltionStorageServiceKey } from '@tokenovate/logger';
import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { AXIOS_CONFIG } from './axios.module';

export interface CustomAxiosRequestConfig extends CreateAxiosDefaults {
  enableLogging?: boolean;
}

@Injectable()
export class AxiosService {
  private instance: AxiosInstance;
  private logger = new Logger(AxiosService.name);
  private headers: CreateAxiosDefaults['headers'];
  private loggingEnabled: boolean = false;

  constructor(
    @Inject(AXIOS_CONFIG) config: CustomAxiosRequestConfig,
    @Inject(CorreltionStorageServiceKey)
    private correlationService: CorrelationService
  ) {
    this.headers = config.headers;
    this.instance = axios.create({
      baseURL: config.baseURL,
    });
    this.loggingEnabled = !!config.enableLogging;
  }

  private buildRequestHeaders(config: any = {}) {
    const headers = {
      ...this.headers,
      ...config?.headers,
      ['x-correlation-id']: this.correlationService.getCorrelationId(),
    };

    return {
      ...config,
      headers,
    };
  }

  private logRequest(method: string, endpoint: string, data?: any, config?: AxiosRequestConfig) {
    if (!this.loggingEnabled) return;

    let baseURL = this.instance.defaults.baseURL;
    if (config?.baseURL) {
      baseURL = config.baseURL;
    }

    let logMsg = `${method}: ${baseURL}${endpoint}`;
    if (data) {
      logMsg += ` with payload: ${JSON.stringify(data)}`;
    }
    this.logger.debug(logMsg);
  }

  private logResponse(method: string, endpoint: string, data: any, config?: AxiosRequestConfig) {
    if (!this.loggingEnabled) return;

    let baseURL = this.instance.defaults.baseURL;
    if (config?.baseURL) {
      baseURL = config.baseURL;
    }

    this.logger.debug(`${method} ${baseURL}${endpoint} response: ${JSON.stringify(data)}`);
  }

  private logError(
    method: string,
    endpoint: string,
    error: any,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    let baseURL = this.instance.defaults.baseURL;
    if (config?.baseURL) {
      baseURL = config.baseURL;
    }

    let logMsg = `${method}: ${baseURL}${endpoint}`;
    if (data) {
      logMsg += ` with payload: ${JSON.stringify(data)}`;
    }
    logMsg += ` failed: ${error.message}`;
    this.logger.error(logMsg);
  }

  async get<D, T>(endpoint: string, config?: AxiosRequestConfig<D>): Promise<T> {
    this.logRequest('GET', endpoint, null, config);
    try {
      const response = await this.instance.get<T>(endpoint, this.buildRequestHeaders(config));
      this.logResponse('GET', endpoint, response.data, config);
      return response.data;
    } catch (error) {
      this.logError('GET', endpoint, error, null, config);
      throw error;
    }
  }

  async post<D, T>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    this.logRequest('POST', endpoint, data, config);
    try {
      const response = await this.instance.post<T>(
        endpoint,
        data,
        this.buildRequestHeaders(config)
      );
      this.logResponse('POST', endpoint, response.data, config);
      return response.data;
    } catch (error) {
      this.logError('POST', endpoint, error, data, config);
      throw error;
    }
  }

  async put<D, T>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    this.logRequest('PUT', endpoint, data, config);
    try {
      const response = await this.instance.put<T>(endpoint, data, this.buildRequestHeaders(config));
      this.logResponse('PUT', endpoint, response.data, config);
      return response.data;
    } catch (error) {
      this.logError('PUT', endpoint, error, data, config);
      throw error;
    }
  }

  async delete<D, T>(endpoint: string, config?: AxiosRequestConfig<D>): Promise<T> {
    this.logRequest('DELETE', endpoint, null, config);
    try {
      const response = await this.instance.delete<T>(endpoint, this.buildRequestHeaders(config));
      this.logResponse('DELETE', endpoint, response.data, config);
      return response.data;
    } catch (error) {
      this.logError('DELETE', endpoint, error, null, config);
      throw error;
    }
  }

  async patch<D, T>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    this.logRequest('PATCH', endpoint, data, config);
    try {
      const response = await this.instance.patch<T>(
        endpoint,
        data,
        this.buildRequestHeaders(config)
      );
      this.logResponse('PATCH', endpoint, response.data, config);
      return response.data;
    } catch (error) {
      this.logError('PATCH', endpoint, error, data, config);
      throw error;
    }
  }
}
