const { ChromaClientExtended } = require("../dist/index.js");

async function run() {
  const PATH = 'http://localhost:8000'
  const reachable = await fetch(`${PATH}/api/v1`).then((res) => res.ok).catch(() => false);
  if (!reachable) {
    console.log(`\nService is not online at ${PATH} - cannot test. Exiting\n`)
    process.exit(1);
  }

  const client = new ChromaClientExtended({
    path: PATH,
    fetchOptions: {
      headers: {
        'X-Api-Token': "sk-live-Hunt3r2"
      }
    }
  });

  console.log(await client.reset())
  console.log(await client.heartbeat())

  await client.createCollection({ name: "test" });
  console.log(await client.listCollections())

  const collection = await client.getCollection({ name: 'test' })
  console.log({ count: await collection.count() })

  const ids = 'test1'
  const embeddings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const metadatas = { test: 'test' }
  await collection.add({ ids, embeddings, metadatas })
  console.log(await collection.count())
  console.log('Tests completed.')
}

run()