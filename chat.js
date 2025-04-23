const {qdrant} = require('./qdrant.js');
const { embedTexts } = require('./gemini.js');  

async function searchSimilarChunks(collection, query) {
    const [queryVector] = await embedTexts([query]);
    const res = await qdrant.search(collection, {
      vector: queryVector,
      with_payload: true,
    });
    return res.map(r => r.payload.text);
  }
  
  module.exports = { searchSimilarChunks };