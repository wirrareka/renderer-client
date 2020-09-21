/// <reference types="node" />
import { ReadStream } from 'fs';
export declare class RendererClient {
    private axios;
    constructor(token: string, url?: string);
    private streamToData;
    stream: (templateCode: string, format: "pdf" | "xlsx" | "csv", data?: any, options?: any) => Promise<ReadStream>;
    print: (templateCode: string, format: "pdf" | "xlsx" | "csv", data?: any, options?: any) => Promise<string>;
    pdf: (templateCode: string, data?: any, options?: any) => Promise<string>;
    xls: (templateCode: string, data?: any, options?: any) => Promise<string>;
    csv: (templateCode: string, data?: any, options?: any) => Promise<string>;
    pdfStream: (templateCode: string, data?: any, options?: any) => Promise<ReadStream>;
    xlsStream: (templateCode: string, data?: any, options?: any) => Promise<ReadStream>;
    csvStream: (templateCode: string, data?: any, options?: any) => Promise<ReadStream>;
}
//# sourceMappingURL=index.d.ts.map