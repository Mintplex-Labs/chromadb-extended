"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromaClientExtended = void 0;
const generated_1 = require("chromadb/dist/main/generated");
const utils_1 = require("chromadb/dist/main/utils");
const Collection_1 = require("chromadb/dist/main/Collection");
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
        this.options = fetchOptions !== null && fetchOptions !== void 0 ? fetchOptions : {};
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
        return await this.api.reset(this.options);
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
        const response = await this.api.version(this.options);
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
        const response = await this.api.heartbeat(this.options);
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
        }, this.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection_1.Collection(name, newCollection.id, this.api, metadata, embeddingFunction);
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
        }, this.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection_1.Collection(name, newCollection.id, this.api, newCollection.metadata, embeddingFunction);
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
        const response = await this.api.listCollections(this.options);
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
            .getCollection(name, this.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (response.error) {
            throw new Error(response.error);
        }
        return new Collection_1.Collection(response.name, response.id, this.api, response.metadata, embeddingFunction);
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
            .deleteCollection(name, this.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
}
exports.ChromaClientExtended = ChromaClientExtended;
//# sourceMappingURL=index.js.map