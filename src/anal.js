import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const ClusterList = () => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference the collection
        const querySnapshot = await getDocs(collection(db, "numClusters"));

        // Map over documents and extract data
        const clusterData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Auto-ID
          ...doc.data(), // Document fields
        }));

        setClusters(clusterData); // Set state with the data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cluster List</h1>
      <ul>
        {clusters.map((cluster) => (
          <li key={cluster.id}>
            <strong>ID:</strong> {cluster.id},<strong> Timestamp:</strong>{" "}
            {new Date(cluster.timestamp.seconds * 1000).toLocaleString()},
            <strong> Cluster Count:</strong> {cluster.clusterCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClusterList;
