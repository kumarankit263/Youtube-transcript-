require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getTranscriptChunks } = require('./transcript.js');
const { embedTexts, chatWithContext } = require('./gemini.js');
const { qdrant, createCollectionIfNeeded } = require('./qdrant.js');
const { searchSimilarChunks } = require('./chat.js');

const app=express();
app.use(cors());
app.use(express.json());

const COLLECTION="youtube_transcripts";

app.post('/upload',async (req,res)=>{
    try{
        const { url } = req.body;
    await createCollectionIfNeeded(COLLECTION);
    const chunks = await getTranscriptChunks(url);
    const vectors = await embedTexts(chunks);

    const points = chunks.map((text, i) => ({
      id: i,
      vector: vectors[i],
      payload: { text },
    }));

        await qdrant.upsert(COLLECTION, { points });
    res.json({ status: "Success", message: "Transcript embedded and uploaded!" });
    }catch(err){
        res.status(500).json({ status: "Error", message: err.message });
    }
});

app.post('/ask',async (req,res)=>{
    try{
        const {query}=req.body; 
        if(!query){
            return res.status(400).json({status:"Error",message:"Query is required"});
        }
        const chunks=await searchSimilarChunks(COLLECTION,query);
        // console.log(chunks);
        const context=chunks.join('\n');
        // console.log("Context:",context);
        const answer = await chatWithContext(context, query);
        console.log("Answer:",answer);
        res.json({ status: "Success", message: answer });
    }catch (err) {
        res.status(500).json({ status: "Error", message: err.message });
      }
    });

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });