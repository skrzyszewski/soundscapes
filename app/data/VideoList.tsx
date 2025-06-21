import axios from "axios";

const VideoList = async () => {
  const accessToken =
    "patt7fCq4saZZ7Fnl.7fc971eb19a50e3a02985107ab09c792a8434755c83bf23c0feec89fca24b30f";
  const baseId = "app1BZiL9a3hDd8lS";
  const table = "Videos";

  const apiUrl = `https://api.airtable.com/v0/${baseId}/${table}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(apiUrl, config);
    return response.data.records;
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    throw error;
  }
};

export default VideoList;
