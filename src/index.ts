import Axios, { AxiosInstance } from 'axios';
import { ReadStream } from 'fs';

const environment = process.env.NODE_ENV || 'development';
const DefaultURL = environment === 'production' ? 'https://renderer.quanto.sk' : 'http://localhost:4000';

export class RendererClient {
  private axios: AxiosInstance;

  constructor(token: string, url: string = DefaultURL) {
    this.axios = Axios.create({
      baseURL: `${url}/api`,
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  private streamToData = async (stream: ReadStream): Promise<string> => {
    const chunks = [] as any[];
    const streamData = await new Promise<string>((resolve, reject) => {
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')))
    });
    return streamData;
  }

  public stream = async (templateCode: string, format: 'pdf' | 'xlsx' | 'csv', data: any = {}, options: any = {}) : Promise<ReadStream> => {
    const params = `return_type=document&regenerate=true`;
    const url = `/renders/${templateCode}.${format}?${params}`;
    const response = await this.axios.post(url, { data, options }, {
      responseType: 'stream'
    });
    return response.data
  }

  public print = async (templateCode: string, format: 'pdf' | 'xlsx' | 'csv', data: any = {}, options: any = {}) : Promise<string> => {
    const stream = await this.stream(templateCode, format, data, options);
    return this.streamToData(stream);
  }

  public pdf = async (templateCode: string, data: any = {}, options: any = {}) : Promise<string> => {
    return this.print(templateCode, 'pdf', data, options)
  }

  public xls = async (templateCode: string, data: any = {}, options: any = {}) : Promise<string> => {
    return this.print(templateCode, 'xlsx', data, options)
  }

  public csv = async (templateCode: string, data: any = {}, options: any = {}) : Promise<string> => {
    return this.print(templateCode, 'csv', data, options)
  }

  public pdfStream = async (templateCode: string, data: any = {}, options: any = {}) : Promise<ReadStream> => {
    return this.stream(templateCode, 'pdf', data, options)
  }

  public xlsStream = async (templateCode: string, data: any = {}, options: any = {}) : Promise<ReadStream> => {
    return this.stream(templateCode, 'xlsx', data, options)
  }

  public csvStream = async (templateCode: string, data: any = {}, options: any = {}) : Promise<ReadStream> => {
    return this.stream(templateCode, 'csv', data, options)
  }
}
