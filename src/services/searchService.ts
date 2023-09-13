import OpenSearch from '../opensearch/openSearch.js';
import { ApiResponse } from '@opensearch-project/opensearch';
import { openSearchIndexName } from '../constants/openSearchIndexName.js'

class SearchService {
    async search(searchExpression: string) {
        const openSearchResponse = await OpenSearch.getClient().search({
            index: openSearchIndexName,
            body: {
                query: {
                    multi_match: {
                        query: searchExpression,
                        fields: ['title', 'text', 'subject.name'],
                    },
                },
            },
        });
        return this.parseOpenSearchResponse(openSearchResponse);
    }

    private parseOpenSearchResponse(response: ApiResponse) {
        let parsedObjects = [];
        for (let i = 0; i < response.body.hits.hits.length; i++) {
            parsedObjects.push(response.body.hits.hits[i]._source);
        }
        return parsedObjects;
    }
}

export default new SearchService();
