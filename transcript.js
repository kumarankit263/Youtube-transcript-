const YoutubeTranscript = require('youtube-transcript');

async function getTranscriptChunks(videoId) {
    const transcript=await YoutubeTranscript.YoutubeTranscript.fetchTranscript(videoId);    
    const text=transcript.map(item=>item.text).join(' ');

    const chunkSize=1000,overlap=200;
    const chunks=[];
    for(let i=0;i<text.length;i+=chunkSize-overlap){
        chunks.push(text.slice(i,i+chunkSize));
    }
    return chunks;
}
module.exports={getTranscriptChunks};