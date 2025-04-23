async function uploadTranscript() {
    const url = document.getElementById("videoUrl").value;
    if (!url) {
      alert("Please enter a video URL");
      return;
    }
  
    document.getElementById("status").innerText = "Uploading and embedding transcript...";
  
    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      document.getElementById("status").innerText = data.message;
    } catch (err) {
      document.getElementById("status").innerText = "Error uploading transcript";
      console.error(err);
    }
  }
  
  async function askQuestion() {
    const query = document.getElementById("userQuery").value;
    if (!query) {
      alert("Please enter your question");
      return;
    }
  
    document.getElementById("answer").innerText = "Thinking...";
  
    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      document.getElementById("answer").innerText = data.message;
    } catch (err) {
      document.getElementById("answer").innerText = "Error getting answer";
      console.error(err);
    }
  }
  