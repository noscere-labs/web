import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Logger } from '@nestjs/common';

export class AxiosClient {
  private instance: AxiosInstance;
  private logger = new Logger(AxiosClient.name);

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async get<D, T>(endpoint: string, config?: AxiosRequestConfig<D>): Promise<T> {
    try {
      const response = await this.instance.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      this.logger.error(`GET request to ${endpoint} failed: ${error.message}`);
      throw error;
    }
  }

  async post<D, T>(endpoint: string, ...params: any[]): Promise<T> {
    try {
      // Extract the config if it exists
      let data: any;
      let config: AxiosRequestConfig<D> | undefined;

      if (params.length > 0) {
        if (
          params.length === 1 ||
          typeof params[params.length - 1] !== 'object' ||
          !params[params.length - 1].headers
        ) {
          // All parameters are data
          data = params;
        } else {
          // Last parameter is config
          config = params.pop();
          data = params;
        }
      }

      const response = await this.instance.post<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.logger.error(`POST request to ${endpoint} failed: ${error.message}`);
      throw error;
    }
  }

  async put<D, T>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    try {
      const response = await this.instance.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.logger.error(`PUT request to ${endpoint} failed: ${error.message}`);
      throw error;
    }
  }

  async delete<D, T>(endpoint: string, config?: AxiosRequestConfig<D>): Promise<T> {
    try {
      const response = await this.instance.delete<T>(endpoint, config);
      return response.data;
    } catch (error) {
      this.logger.error(`DELETE request to ${endpoint} failed: ${error.message}`);
      throw error;
    }
  }

  async patch<D, T>(endpoint: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    try {
      const response = await this.instance.patch<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.logger.error(`PATCH request to ${endpoint} failed: ${error.message}`);
      throw error;
    }
  }
}
