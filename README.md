## chromadb-extended by Mintplex Labs

This is an extension on the [original chromadb npm package](https://www.npmjs.com/package/chromadb) to enable the ability to use private single-instance Chroma instances to utilize authentication during their requests.


## Getting started

Chroma needs to be running in order for this client to talk to it. Please see the [🧪 Usage Guide](https://docs.trychroma.com/usage-guide) to learn how to quickly stand this up.

## Small example

```js
import { ChromaClientExtended } from "chromadb-extended";
const chroma = new ChromaClient({
  path: "http://localhost:8000",
  fetchOptions: {
    headers: {
      'X-Api-Token': "sk-live-Hunt3r2", // Works like regular node-fetch headers!
    }
  }
});

// Now use as you normally would use chromadb

await client.reset()
await client.heartbeat()
await client.getOrCreateCollection({ name: "test" });
await client.listCollections()
const collection = await client.getCollection({ name: 'test' })
await collection.count()
await collection.add({ ids, embeddings, metadatas })
// etc etc
```
## License

Apache 2.0
