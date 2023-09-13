import { Client } from '@opensearch-project/opensearch';
import dotenv from 'dotenv';

dotenv.config();

class OpenSearch {
    public getClient() {
        return new Client({
            node: process.env.OPENSEARCH_URL,
        });
    }

    public async createIndex(name: string, setting: object) {
        const client = this.getClient();
        const indexIsExists = (await client.indices.exists({ index: name })).body;
        if (!indexIsExists) {
            await client.indices.create({
                index: name,
                body: setting,
            });
        }
    }
}

export default new OpenSearch();
