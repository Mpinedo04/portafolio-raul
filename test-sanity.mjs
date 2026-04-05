import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xa9cwnu5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const data = await client.fetch(`*[_type == "equipment" || _type == "equipment" && _id match "drafts.*"]{ name, category, _id }`);
  console.log("EQUIPMENT IN SANITY:");
  console.log(JSON.stringify(data, null, 2));
}

run();
