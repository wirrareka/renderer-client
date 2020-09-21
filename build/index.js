import Axios from 'axios';
const environment = process.env.NODE_ENV || 'development';
const DefaultURL = environment === 'production' ? 'https://renderer.quanto.sk' : 'http://localhost:4000';
export class RendererClient {
    constructor(token, url = DefaultURL) {
        this.streamToData = async (stream) => {
            const chunks = [];
            const streamData = await new Promise((resolve, reject) => {
                stream.on('data', chunk => chunks.push(chunk));
                stream.on('error', reject);
                stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
            });
            return streamData;
        };
        this.stream = async (templateCode, format, data = {}, options = {}) => {
            const params = `return_type=document&regenerate=true`;
            const url = `/renders/${templateCode}.${format}?${params}`;
            const response = await this.axios.post(url, { data, options }, {
                responseType: 'stream'
            });
            return response.data;
        };
        this.print = async (templateCode, format, data = {}, options = {}) => {
            const stream = await this.stream(templateCode, format, data, options);
            return this.streamToData(stream);
        };
        this.pdf = async (templateCode, data = {}, options = {}) => {
            return this.print(templateCode, 'pdf', data, options);
        };
        this.xls = async (templateCode, data = {}, options = {}) => {
            return this.print(templateCode, 'xlsx', data, options);
        };
        this.csv = async (templateCode, data = {}, options = {}) => {
            return this.print(templateCode, 'csv', data, options);
        };
        this.pdfStream = async (templateCode, data = {}, options = {}) => {
            return this.stream(templateCode, 'pdf', data, options);
        };
        this.xlsStream = async (templateCode, data = {}, options = {}) => {
            return this.stream(templateCode, 'xlsx', data, options);
        };
        this.csvStream = async (templateCode, data = {}, options = {}) => {
            return this.stream(templateCode, 'csv', data, options);
        };
        this.axios = Axios.create({
            baseURL: `${url}/api`,
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }
}
//# sourceMappingURL=index.js.map