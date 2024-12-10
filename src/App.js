import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [numClusters, setNumClusters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/num_clusters") 
      .then((response) => {
        setNumClusters(response.data.num_clusters);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch cluster data");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cluster Information</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {numClusters !== null && !loading && (
        <p>
          <strong>Number of Clusters:</strong> {numClusters}
        </p>
      )}
    </div>
  );
}

export default App;
