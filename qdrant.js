const { QdrantClient } = require('@qdrant/js-client-rest');

const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
});

async function createCollectionIfNeeded(collectionName) {
    const collections = await qdrant.getCollections();
    const exits = collections.collections?.some(c => c.name === collectionName);
    if (!exits) {
        await qdrant.createCollection(collectionName, {
            vectors: {
                size: 768,
                distance: 'Cosine',
            },
        });
    }
}

module.exports={qdrant,createCollectionIfNeeded};