import { Injectable, Logger } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import * as transliteration from 'transliteration';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly logger = new Logger(S3Service.name);

  constructor() {
    this.s3Client = new S3Client({
      region: 'ru-1',
      endpoint: 'https://s3.timeweb.cloud',
      credentials: {
        accessKeyId: 'WON9ZMZBE1JHXMUV4ZWC',
        secretAccessKey: 'DXlnQAlJdGFkVlW3ElXPXQCeKkAnQZDsLKDj4P2k',
      },
      forcePathStyle: true,
    });
    this.bucketName = '30489bee-ejournal';
  }

    private generateUniqueKey(originalName: string): string {
        const key = transliteration.slugify(originalName);
        const uniqueId = uuidv4();
        const [fileName, fileExtension] = this.splitFileName(key);
        return `${fileName}-${uniqueId}.${fileExtension}`;
    }

    private splitFileName(fileName: string): [string, string] {
        const parts = fileName.split('.');
        const extension = parts.pop() || '';
        return [parts.join('.'), extension];
    }

    async uploadFile(
        originalName: string,
        file: Buffer | Readable,
        contentType: string,
    ): Promise<{ key: string; bucket: string }> {
        const key = this.generateUniqueKey(originalName);

        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: file,
            ContentType: contentType,
        };

        try {
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
            this.logger.log(`File uploaded: ${key}`);
            return { key, bucket: this.bucketName };
        } catch (error) {
            this.logger.error('Error uploading file', error);
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }

    async getFile(key: string): Promise<Buffer> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            const response = await this.s3Client.send(command);

            if (!response.Body) {
                throw new Error('File not found in S3');
            }

            return await this.streamToBuffer(response.Body as Readable);
        } catch (error) {
            this.logger.error('Error getting file', error);
            throw new Error(`Error getting file: ${error.message}`);
        }
    }

    async deleteFile(key: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3Client.send(command);
            this.logger.log(`File deleted: ${key}`);
        } catch (error) {
            this.logger.error('Error deleting file', error);
            throw new Error(`Error deleting file: ${error.message}`);
        }
    }

    async generatePresignedUrl(
        key: string,
        expiresIn: number = 3600,
    ): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            return await getSignedUrl(this.s3Client, command, { expiresIn });
        } catch (error) {
            this.logger.error('Error generating presigned URL', error);
            throw new Error(`Error generating presigned URL: ${error.message}`);
        }
    }

    async listFiles(): Promise<string[]> {
        try {
            const command = new ListObjectsV2Command({
                Bucket: this.bucketName,
            });
            const response = await this.s3Client.send(command);

            if (!response.Contents) {
                this.logger.log('No files found in bucket');
                return [];
            }

            return response.Contents.map((item) => item.Key || '');
        } catch (error) {
            this.logger.error('Error listing files', error);
            throw new Error(`Error listing files: ${error.message}`);
        }
    }

    private streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Uint8Array[] = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('error', reject);
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
}
