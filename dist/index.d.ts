import { IncludeEnum, Metadata, Metadatas, Embedding, Embeddings, Document, Documents, Where, WhereDocument, ID, IDs, PositiveInteger, GetResponse, QueryResponse, AddResponse, CollectionMetadata, CollectionType } from "chromadb/dist/main/types";
import { IEmbeddingFunction } from "chromadb/dist/main//embeddings/IEmbeddingFunction";
import { ApiApi as DefaultApi, Api } from "chromadb/dist/main/generated";
export declare class ChromaClientExtended {
    /**
     * @ignore
     */
    private api;
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
    constructor({ path, fetchOptions, }?: {
        path?: string;
        fetchOptions?: RequestInit;
    });
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
    reset(): Promise<Api.Reset200Response>;
    /**
     * Returns the version of the Chroma API.
     * @returns {Promise<string>} A promise that resolves to the version of the Chroma API.
     *
     * @example
     * ```typescript
     * const version = await client.version();
     * ```
     */
    version(): Promise<string>;
    /**
     * Returns a heartbeat from the Chroma API.
     * @returns {Promise<number>} A promise that resolves to the heartbeat from the Chroma API.
     *
     * @example
     * ```typescript
     * const heartbeat = await client.heartbeat();
     * ```
     */
    heartbeat(): Promise<number>;
    /**
     * @ignore
     */
    persist(): Promise<never>;
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
    createCollection({ name, metadata, embeddingFunction, }: {
        name: string;
        metadata?: CollectionMetadata;
        embeddingFunction?: IEmbeddingFunction;
    }): Promise<Collection>;
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
    getOrCreateCollection({ name, metadata, embeddingFunction, }: {
        name: string;
        metadata?: CollectionMetadata;
        embeddingFunction?: IEmbeddingFunction;
    }): Promise<Collection>;
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
    listCollections(): Promise<CollectionType[]>;
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
    getCollection({ name, embeddingFunction, }: {
        name: string;
        embeddingFunction?: IEmbeddingFunction;
    }): Promise<Collection>;
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
    deleteCollection({ name }: {
        name: string;
    }): Promise<void>;
}
declare class Collection {
    name: string;
    id: string;
    metadata: CollectionMetadata | undefined;
    /**
     * @ignore
     */
    private api;
    /**
     * @ignore
     */
    embeddingFunction: IEmbeddingFunction | undefined;
    /**
     * @ignore
     */
    constructor(name: string, id: string, api: DefaultApi, metadata?: CollectionMetadata, embeddingFunction?: IEmbeddingFunction);
    /**
     * @ignore
     */
    private setName;
    /**
     * @ignore
     */
    private setMetadata;
    /**
     * @ignore
     */
    private validate;
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
    add({ ids, embeddings, metadatas, documents, }: {
        ids: ID | IDs;
        embeddings?: Embedding | Embeddings;
        metadatas?: Metadata | Metadatas;
        documents?: Document | Documents;
    }): Promise<AddResponse>;
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
    upsert({ ids, embeddings, metadatas, documents, }: {
        ids: ID | IDs;
        embeddings?: Embedding | Embeddings;
        metadatas?: Metadata | Metadatas;
        documents?: Document | Documents;
    }): Promise<boolean>;
    /**
     * Count the number of items in the collection
     * @returns {Promise<number>} - The response from the API.
     *
     * @example
     * ```typescript
     * const response = await collection.count();
     * ```
     */
    count(): Promise<number>;
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
    modify({ name, metadata, }?: {
        name?: string;
        metadata?: CollectionMetadata;
    }): Promise<void>;
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
    get({ ids, where, limit, offset, include, whereDocument, }?: {
        ids?: ID | IDs;
        where?: Where;
        limit?: PositiveInteger;
        offset?: PositiveInteger;
        include?: IncludeEnum[];
        whereDocument?: WhereDocument;
    }): Promise<GetResponse>;
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
    update({ ids, embeddings, metadatas, documents, }: {
        ids: ID | IDs;
        embeddings?: Embedding | Embeddings;
        metadatas?: Metadata | Metadatas;
        documents?: Document | Documents;
    }): Promise<boolean>;
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
    query({ queryEmbeddings, nResults, where, queryTexts, whereDocument, include, }: {
        queryEmbeddings?: Embedding | Embeddings;
        nResults?: PositiveInteger;
        where?: Where;
        queryTexts?: string | string[];
        whereDocument?: WhereDocument;
        include?: IncludeEnum[];
    }): Promise<QueryResponse>;
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
    peek({ limit, }?: {
        limit?: PositiveInteger;
    }): Promise<GetResponse>;
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
    delete({ ids, where, whereDocument, }?: {
        ids?: ID | IDs;
        where?: Where;
        whereDocument?: WhereDocument;
    }): Promise<string[]>;
}
export {};
//# sourceMappingURL=index.d.ts.map