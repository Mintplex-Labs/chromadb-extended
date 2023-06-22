"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromaClientExtended = void 0;
const generated_1 = require("chromadb/dist/main/generated");
const utils_1 = require("chromadb/dist/main/utils");
class ChromaClientExtended {
    /**
     * Creates a new ChromaClient instance.
     * @param {Object} params - The parameters for creating a new client
     * @param {string} [params.path] - The base path for the Chroma API.
     * @returns {ChromaClient} A new ChromaClient instance.
     *
     * @example
     * ```typescript
     * const client = new ChromaClient({
     *   path: "http://localhost:8000"
     * });
     * ```
     */
    constructor({ path, fetchOptions, } = {}) {
        if (path === undefined)
            path = "http://localhost:8000";
        const apiConfig = new generated_1.Configuration({
            basePath: path,
        });
        this.api = new generated_1.ApiApi(apiConfig);
        this.api.options = fetchOptions !== null && fetchOptions !== void 0 ? fetchOptions : {};
    }
    /**
     * Resets the state of the object by making an API call to the reset endpoint.
     *
     * @returns {Promise<Api.Reset200Response>} A promise that resolves when the reset operation is complete.
     * @throws {Error} If there is an issue resetting the state.
     *
     * @example
     * ```typescript
     * await client.reset();
     * ```
     */
    async reset() {
        return await this.api.reset(this.api.options);
    }
    /**
     * Returns the version of the Chroma API.
     * @returns {Promise<string>} A promise that resolves to the version of the Chroma API.
     *
     * @example
     * ```typescript
     * const version = await client.version();
     * ```
     */
    async version() {
        const response = await this.api.version(this.api.options);
        return await (0, utils_1.handleSuccess)(response);
    }
    /**
     * Returns a heartbeat from the Chroma API.
     * @returns {Promise<number>} A promise that resolves to the heartbeat from the Chroma API.
     *
     * @example
     * ```typescript
     * const heartbeat = await client.heartbeat();
     * ```
     */
    async heartbeat() {
        const response = await this.api.heartbeat(this.api.options);
        let ret = await (0, utils_1.handleSuccess)(response);
        return ret["nanosecond heartbeat"];
    }
    /**
     * @ignore
     */
    async persist() {
        throw new Error("Not implemented in JS client");
    }
    /**
     * Creates a new collection with the specified properties.
     *
     * @param {Object} params - The parameters for creating a new collection.
     * @param {string} params.name - The name of the collection.
     * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     *
     * @returns {Promise<Collection>} A promise that resolves to the created collection.
     * @throws {Error} If there is an issue creating the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.createCollection({
     *   name: "my_collection",
     *   metadata: {
     *     "description": "My first collection"
     *   }
     * });
     * ```
     */
    async createCollection({ name, metadata, embeddingFunction, }) {
        const newCollection = await this.api
            .createCollection({
            name,
            metadata,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection(name, newCollection.id, this.api, metadata, embeddingFunction);
    }
    /**
     * Gets or creates a collection with the specified properties.
     *
     * @param {Object} params - The parameters for creating a new collection.
     * @param {string} params.name - The name of the collection.
     * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     *
     * @returns {Promise<Collection>} A promise that resolves to the got or created collection.
     * @throws {Error} If there is an issue getting or creating the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.getOrCreateCollection({
     *   name: "my_collection",
     *   metadata: {
     *     "description": "My first collection"
     *   }
     * });
     * ```
     */
    async getOrCreateCollection({ name, metadata, embeddingFunction, }) {
        const newCollection = await this.api
            .createCollection({
            name,
            metadata,
            get_or_create: true,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection(name, newCollection.id, this.api, newCollection.metadata, embeddingFunction);
    }
    /**
     * Lists all collections.
     *
     * @returns {Promise<CollectionType[]>} A promise that resolves to a list of collection names.
     * @throws {Error} If there is an issue listing the collections.
     *
     * @example
     * ```typescript
     * const collections = await client.listCollections();
     * ```
     */
    async listCollections() {
        const response = await this.api.listCollections(this.api.options);
        return (0, utils_1.handleSuccess)(response);
    }
    /**
     * Gets a collection with the specified name.
     * @param {Object} params - The parameters for getting a collection.
     * @param {string} params.name - The name of the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     * @returns {Promise<Collection>} A promise that resolves to the collection.
     * @throws {Error} If there is an issue getting the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.getCollection({
     *   name: "my_collection"
     * });
     * ```
     */
    async getCollection({ name, embeddingFunction, }) {
        const response = await this.api
            .getCollection(name, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (response.error) {
            throw new Error(response.error);
        }
        return new Collection(response.name, response.id, this.api, response.metadata, embeddingFunction);
    }
    /**
     * Deletes a collection with the specified name.
     * @param {Object} params - The parameters for deleting a collection.
     * @param {string} params.name - The name of the collection.
     * @returns {Promise<void>} A promise that resolves when the collection is deleted.
     * @throws {Error} If there is an issue deleting the collection.
     *
     * @example
     * ```typescript
     * await client.deleteCollection({
     *  name: "my_collection"
     * });
     * ```
     */
    async deleteCollection({ name }) {
        return await this.api
            .deleteCollection(name, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
}
exports.ChromaClientExtended = ChromaClientExtended;
class Collection {
    /**
     * @ignore
     */
    constructor(name, id, api, metadata, embeddingFunction) {
        this.name = name;
        this.id = id;
        this.metadata = metadata;
        this.api = api;
        if (embeddingFunction !== undefined)
            this.embeddingFunction = embeddingFunction;
    }
    /**
     * @ignore
     */
    setName(name) {
        this.name = name;
    }
    /**
     * @ignore
     */
    setMetadata(metadata) {
        this.metadata = metadata;
    }
    /**
     * @ignore
     */
    async validate(require_embeddings_or_documents, // set to false in the case of Update
    ids, embeddings, metadatas, documents) {
        if (require_embeddings_or_documents) {
            if (embeddings === undefined && documents === undefined) {
                throw new Error("embeddings and documents cannot both be undefined");
            }
        }
        if (embeddings === undefined && documents !== undefined) {
            const documentsArray = (0, utils_1.toArray)(documents);
            if (this.embeddingFunction !== undefined) {
                embeddings = await this.embeddingFunction.generate(documentsArray);
            }
            else {
                throw new Error("embeddingFunction is undefined. Please configure an embedding function");
            }
        }
        if (embeddings === undefined)
            throw new Error("embeddings is undefined but shouldnt be");
        const idsArray = (0, utils_1.toArray)(ids);
        const embeddingsArray = (0, utils_1.toArrayOfArrays)(embeddings);
        let metadatasArray;
        if (metadatas === undefined) {
            metadatasArray = undefined;
        }
        else {
            metadatasArray = (0, utils_1.toArray)(metadatas);
        }
        let documentsArray;
        if (documents === undefined) {
            documentsArray = undefined;
        }
        else {
            documentsArray = (0, utils_1.toArray)(documents);
        }
        // validate all ids are strings
        for (let i = 0; i < idsArray.length; i += 1) {
            if (typeof idsArray[i] !== "string") {
                throw new Error(`Expected ids to be strings, found ${typeof idsArray[i]} at index ${i}`);
            }
        }
        if ((embeddingsArray !== undefined &&
            idsArray.length !== embeddingsArray.length) ||
            (metadatasArray !== undefined &&
                idsArray.length !== metadatasArray.length) ||
            (documentsArray !== undefined &&
                idsArray.length !== documentsArray.length)) {
            throw new Error("ids, embeddings, metadatas, and documents must all be the same length");
        }
        const uniqueIds = new Set(idsArray);
        if (uniqueIds.size !== idsArray.length) {
            const duplicateIds = idsArray.filter((item, index) => idsArray.indexOf(item) !== index);
            throw new Error(`Expected IDs to be unique, found duplicates for: ${duplicateIds}`);
        }
        return [idsArray, embeddingsArray, metadatasArray, documentsArray];
    }
    /**
     * Add items to the collection
     * @param {Object} params - The parameters for the query.
     * @param {ID | IDs} [params.ids] - IDs of the items to add.
     * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings of the items to add.
     * @param {Metadata | Metadatas} [params.metadatas] - Optional metadata of the items to add.
     * @param {Document | Documents} [params.documents] - Optional documents of the items to add.
     * @returns {Promise<AddResponse>} - The response from the API. True if successful.
     *
     * @example
     * ```typescript
     * const response = await collection.add({
     *   ids: ["id1", "id2"],
     *   embeddings: [[1, 2, 3], [4, 5, 6]],
     *   metadatas: [{ "key": "value" }, { "key": "value" }],
     *   documents: ["document1", "document2"]
     * });
     * ```
     */
    async add({ ids, embeddings, metadatas, documents, }) {
        const [idsArray, embeddingsArray, metadatasArray, documentsArray] = await this.validate(true, ids, embeddings, metadatas, documents);
        const response = await this.api
            .add(this.id, {
            // @ts-ignore
            ids: idsArray,
            embeddings: embeddingsArray,
            // @ts-ignore
            documents: documentsArray,
            metadatas: metadatasArray,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        return response;
    }
    /**
     * Upsert items to the collection
     * @param {Object} params - The parameters for the query.
     * @param {ID | IDs} [params.ids] - IDs of the items to add.
     * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings of the items to add.
     * @param {Metadata | Metadatas} [params.metadatas] - Optional metadata of the items to add.
     * @param {Document | Documents} [params.documents] - Optional documents of the items to add.
     * @returns {Promise<boolean>} - The response from the API. True if successful.
     *
     * @example
     * ```typescript
     * const response = await collection.upsert({
     *   ids: ["id1", "id2"],
     *   embeddings: [[1, 2, 3], [4, 5, 6]],
     *   metadatas: [{ "key": "value" }, { "key": "value" }],
     *   documents: ["document1", "document2"],
     * });
     * ```
     */
    async upsert({ ids, embeddings, metadatas, documents, }) {
        const [idsArray, embeddingsArray, metadatasArray, documentsArray] = await this.validate(true, ids, embeddings, metadatas, documents);
        const response = await this.api
            .upsert(this.id, {
            //@ts-ignore
            ids: idsArray,
            embeddings: embeddingsArray,
            //@ts-ignore
            documents: documentsArray,
            metadatas: metadatasArray,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        return response;
    }
    /**
     * Count the number of items in the collection
     * @returns {Promise<number>} - The response from the API.
     *
     * @example
     * ```typescript
     * const response = await collection.count();
     * ```
     */
    async count() {
        const response = await this.api.count(this.id, this.api.options);
        return (0, utils_1.handleSuccess)(response);
    }
    /**
     * Modify the collection name or metadata
     * @param {Object} params - The parameters for the query.
     * @param {string} [params.name] - Optional new name for the collection.
     * @param {CollectionMetadata} [params.metadata] - Optional new metadata for the collection.
     * @returns {Promise<void>} - The response from the API.
     *
     * @example
     * ```typescript
     * const response = await collection.modify({
     *   name: "new name",
     *   metadata: { "key": "value" },
     * });
     * ```
     */
    async modify({ name, metadata, } = {}) {
        const response = await this.api
            .updateCollection(this.id, {
            new_name: name,
            new_metadata: metadata,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        this.setName(name || this.name);
        this.setMetadata(metadata || this.metadata);
        return response;
    }
    /**
     * Get items from the collection
     * @param {Object} params - The parameters for the query.
     * @param {ID | IDs} [params.ids] - Optional IDs of the items to get.
     * @param {Where} [params.where] - Optional where clause to filter items by.
     * @param {PositiveInteger} [params.limit] - Optional limit on the number of items to get.
     * @param {PositiveInteger} [params.offset] - Optional offset on the items to get.
     * @param {IncludeEnum[]} [params.include] - Optional list of items to include in the response.
     * @param {WhereDocument} [params.whereDocument] - Optional where clause to filter items by.
     * @returns {Promise<GetResponse>} - The response from the server.
     *
     * @example
     * ```typescript
     * const response = await collection.get({
     *   ids: ["id1", "id2"],
     *   where: { "key": "value" },
     *   limit: 10,
     *   offset: 0,
     *   include: ["embeddings", "metadatas", "documents"],
     *   whereDocument: { $contains: "value" },
     * });
     * ```
     */
    async get({ ids, where, limit, offset, include, whereDocument, } = {}) {
        let idsArray = undefined;
        if (ids !== undefined)
            idsArray = (0, utils_1.toArray)(ids);
        return await this.api
            .aGet(this.id, {
            ids: idsArray,
            where,
            limit,
            offset,
            include,
            where_document: whereDocument,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
    /**
     * Update the embeddings, documents, and/or metadatas of existing items
     * @param {Object} params - The parameters for the query.
     * @param {ID | IDs} [params.ids] - The IDs of the items to update.
     * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings to update.
     * @param {Metadata | Metadatas} [params.metadatas] - Optional metadatas to update.
     * @param {Document | Documents} [params.documents] - Optional documents to update.
     * @returns {Promise<boolean>} - The API Response. True if successful. Else, error.
     *
     * @example
     * ```typescript
     * const response = await collection.update({
     *   ids: ["id1", "id2"],
     *   embeddings: [[1, 2, 3], [4, 5, 6]],
     *   metadatas: [{ "key": "value" }, { "key": "value" }],
     *   documents: ["new document 1", "new document 2"],
     * });
     * ```
     */
    async update({ ids, embeddings, metadatas, documents, }) {
        if (embeddings === undefined &&
            documents === undefined &&
            metadatas === undefined) {
            throw new Error("embeddings, documents, and metadatas cannot all be undefined");
        }
        else if (embeddings === undefined && documents !== undefined) {
            const documentsArray = (0, utils_1.toArray)(documents);
            if (this.embeddingFunction !== undefined) {
                embeddings = await this.embeddingFunction.generate(documentsArray);
            }
            else {
                throw new Error("embeddingFunction is undefined. Please configure an embedding function");
            }
        }
        // backend expects None if metadatas is undefined
        if (metadatas !== undefined)
            metadatas = (0, utils_1.toArray)(metadatas);
        if (documents !== undefined)
            documents = (0, utils_1.toArray)(documents);
        var resp = await this.api
            .update(this.id, {
            ids: (0, utils_1.toArray)(ids),
            embeddings: embeddings ? (0, utils_1.toArrayOfArrays)(embeddings) : undefined,
            documents: documents,
            metadatas: metadatas,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        return resp;
    }
    /**
     * Performs a query on the collection using the specified parameters.
     *
     * @param {Object} params - The parameters for the query.
     * @param {Embedding | Embeddings} [params.queryEmbeddings] - Optional query embeddings to use for the search.
     * @param {PositiveInteger} [params.nResults] - Optional number of results to return (default is 10).
     * @param {Where} [params.where] - Optional query condition to filter results based on metadata values.
     * @param {string | string[]} [params.queryTexts] - Optional query text(s) to search for in the collection.
     * @param {WhereDocument} [params.whereDocument] - Optional query condition to filter results based on document content.
     * @param {IncludeEnum[]} [params.include] - Optional array of fields to include in the result, such as "metadata" and "document".
     *
     * @returns {Promise<QueryResponse>} A promise that resolves to the query results.
     * @throws {Error} If there is an issue executing the query.
     * @example
     * // Query the collection using embeddings
     * const results = await collection.query({
     *   queryEmbeddings: [[0.1, 0.2, ...], ...],
     *   nResults: 10,
     *   where: {"name": {"$eq": "John Doe"}},
     *   include: ["metadata", "document"]
     * });
     * @example
     * ```js
     * // Query the collection using query text
     * const results = await collection.query({
     *   queryTexts: "some text",
     *   nResults: 10,
     *   where: {"name": {"$eq": "John Doe"}},
     *   include: ["metadata", "document"]
     * });
     * ```
     *
     */
    async query({ queryEmbeddings, nResults, where, queryTexts, whereDocument, include, }) {
        if (nResults === undefined)
            nResults = 10;
        if (queryEmbeddings === undefined && queryTexts === undefined) {
            throw new Error("queryEmbeddings and queryTexts cannot both be undefined");
        }
        else if (queryEmbeddings === undefined && queryTexts !== undefined) {
            const queryTextsArray = (0, utils_1.toArray)(queryTexts);
            if (this.embeddingFunction !== undefined) {
                queryEmbeddings = await this.embeddingFunction.generate(queryTextsArray);
            }
            else {
                throw new Error("embeddingFunction is undefined. Please configure an embedding function");
            }
        }
        if (queryEmbeddings === undefined)
            throw new Error("embeddings is undefined but shouldnt be");
        const query_embeddingsArray = (0, utils_1.toArrayOfArrays)(queryEmbeddings);
        return await this.api
            .getNearestNeighbors(this.id, {
            query_embeddings: query_embeddingsArray,
            where,
            n_results: nResults,
            where_document: whereDocument,
            include: include,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
    /**
     * Peek inside the collection
     * @param {Object} params - The parameters for the query.
     * @param {PositiveInteger} [params.limit] - Optional number of results to return (default is 10).
     * @returns {Promise<GetResponse>} A promise that resolves to the query results.
     * @throws {Error} If there is an issue executing the query.
     *
     * @example
     * ```typescript
     * const results = await collection.peek({
     *   limit: 10
     * });
     * ```
     */
    async peek({ limit, } = {}) {
        if (limit === undefined)
            limit = 10;
        const response = await this.api.aGet(this.id, {
            limit: limit,
        }, this.api.options);
        return (0, utils_1.handleSuccess)(response);
    }
    /**
     * Deletes items from the collection.
     * @param {Object} params - The parameters for deleting items from the collection.
     * @param {ID | IDs} [params.ids] - Optional ID or array of IDs of items to delete.
     * @param {Where} [params.where] - Optional query condition to filter items to delete based on metadata values.
     * @param {WhereDocument} [params.whereDocument] - Optional query condition to filter items to delete based on document content.
     * @returns {Promise<string[]>} A promise that resolves to the IDs of the deleted items.
     * @throws {Error} If there is an issue deleting items from the collection.
     *
     * @example
     * ```typescript
     * const results = await collection.delete({
     *   ids: "some_id",
     *   where: {"name": {"$eq": "John Doe"}},
     *   whereDocument: {"$contains":"search_string"}
     * });
     * ```
     */
    async delete({ ids, where, whereDocument, } = {}) {
        let idsArray = undefined;
        if (ids !== undefined)
            idsArray = (0, utils_1.toArray)(ids);
        return await this.api
            .aDelete(this.id, { ids: idsArray, where: where, where_document: whereDocument }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
}
//# sourceMappingURL=index.js.map