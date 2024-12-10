import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import "./App.css";

function App() {
  const [lineInfo, setLineInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Query Firestore collection
      const q = query(
        collection(db, "numClusters"), // Replace with your collection name
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      // Handle document data
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0].data();
        const timestamp = doc.timestamp.toDate(); // Convert Firestore Timestamp to JS Date
        setLineInfo({
          clusterCount: doc.clusterCount,
          timestamp: timestamp.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        });
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data from Firestore.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="transparent-box">
        <h1 className="title">Line Information</h1>
        {loading && <p className="loading-text">Loading data...</p>}
        {error && <p className="error-text">{error}</p>}
        {lineInfo && (
          <div>
            <p className="info-text">
              <strong>Number of Clusters:</strong> {lineInfo.clusterCount}
            </p>
            <p className="info-text">
              <strong>Last Updated:</strong> {lineInfo.timestamp}
            </p>
          </div>
        )}
        <button className="refresh-button" onClick={fetchData}>
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;
