import axios, { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { FontListSchema, FontSchema } from './schemas/fontSchemas';
import { CreateMemeResponseSchema } from './schemas/memeSchemas';
import { TemplateListSchema, TemplateSchema } from './schemas/templateSchemas';
import { Font } from './types/fontTypes';
import { CreateMemeParams, CreateMemeResponse } from './types/memeTypes';
import { GetTemplatesParams, Template } from './types/templateTypes';

// TypeScript interfaces for API responses

export default class MemeGeneratorAPI {
  private client: AxiosInstance;

  constructor(apiKey?: string) {
    const headers = apiKey ? { 'X-API-KEY': apiKey } : {};
    this.client = axios.create({
      baseURL: 'https://api.memegen.link',
      headers,
    });
  }

  async getTemplates(params?: GetTemplatesParams): Promise<Template[]> {
    try {
      const response = await this.client.get(`/templates`, { params });
      console.log(response.data);
      return TemplateListSchema.parse(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          `API responded with status code ${error.response.status}`
        );
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received from API');
        console.error(`Request: ${JSON.stringify(error.request)}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw error;
    }
  }

  async getTemplate(id: string): Promise<Template> {
    try {
      const response = await this.client.get(`/templates/${id}`);
      return TemplateSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation failed: ${error.message}`);
      } else {
        throw new Error(`Failed to retrieve template with ID: ${id}`);
      }
    }
  }
  async generateMeme(
    templateId: string,
    params?: CreateMemeParams
  ): Promise<CreateMemeResponse> {
    try {
      const response = await this.client.post(
        `/templates/${templateId}`,
        params
      );
      return CreateMemeResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation failed: ${error.message}`);
      } else {
        throw new Error(
          `Failed to generate meme for template with ID: ${templateId}`
        );
      }
    }
  }

  async getFonts(): Promise<Font[]> {
    try {
      const response = await this.client.get(`/fonts`);
      return FontListSchema.parse(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          `API responded with status code ${error.response.status}`
        );
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received from API');
        console.error(`Request: ${JSON.stringify(error.request)}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      throw error;
    }
  }

  async getFont(id: string): Promise<Font> {
    try {
      const response = await this.client.get(`/fonts/${id}`);
      return FontSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation failed: ${error.message}`);
      } else {
        throw new Error(`Failed to retrieve font with ID: ${id}`);
      }
    }
  }
}
