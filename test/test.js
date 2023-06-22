const { ChromaClientExtended } = require("../dist/index.js");

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function run() {
  const PATH = 'https://sgrh4jb9s5.execute-api.us-west-1.amazonaws.com/dev'
  const reachable = await fetch(`${PATH}/api/v1`).then((res) => ![404, 500].includes(res.status)).catch(() => false);
  if (!reachable) {
    console.log(`\nService is not online at ${PATH} - cannot test. Exiting\n`)
    process.exit(1);
  }

  const client = new ChromaClientExtended({
    path: PATH,
    fetchOptions: {
      headers: {
        'x-api-key': "Wl2WNki9DT2r434RXMHbCpE8ponXsXnaxNn9tYxa"
      }
    }
  });

  await client.reset()
  console.log(await client.heartbeat())

  await client.getOrCreateCollection({ name: "test" });
  console.log(await client.listCollections())

  const collection = await client.getCollection({ name: 'test' })
  console.log({ currentCount: await collection.count() })

  const ids = makeid(20)
  const embeddings = Array.from({ length: 10 }, () => Math.floor(Math.random() * 99));
  const metadatas = { test: 'test' }
  await collection.add({ ids, embeddings, metadatas })
  console.log({ updatedCount: await collection.count() })
  console.log('Tests completed.')
}

run()