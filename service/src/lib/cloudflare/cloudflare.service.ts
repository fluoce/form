import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ulid } from 'ulid'

@Injectable()
export class CloudflareService {
    private readonly r2: S3Client;
    private readonly bucket: string;
    constructor() {
        const accessKeyId = process.env.R2_ID!;
        const secretAccessKey = process.env.R2_KEY!;
        const endpoint = process.env.R2_URL!;
        const bucket = process.env.R2_BUCKET!;
        this.bucket = bucket;
        this.r2 = new S3Client({
            region: 'auto',
            endpoint,
            forcePathStyle: true,
            credentials: {
                accessKeyId: accessKeyId.trim(),
                secretAccessKey: secretAccessKey.trim(),
            },
        });
    }

    async r2SignedUrl(userId: string): Promise<string | null> {
        const Key = `form-banner/${userId}/${ulid()}`;
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key
        });
        return await getSignedUrl(this.r2, command, { expiresIn: 120 });
    }
}
