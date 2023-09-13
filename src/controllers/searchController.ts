import { Request, Response } from 'express';
import SearchService from '../services/searchService.js';

class SearchController {
    async search(request: Request, response: Response) {
        await SearchService.search(request.query.searchExpression!.toString())
            .then((objects) => {
                response.status(200).send(objects);
            })
            .catch((error) => {
                response.status(400).send(error);
            });
    }
}

export default new SearchController();
