const MovieDataAPI = async () => {
  const data = await fetch(`
https://api.themoviedb.org/3/trending/all/day?api_key=ccf711f2e7a3eadbcc4f8d010b633d4e`);
  const dataJ = await data.json();
  return(dataJ.results);
};

export default MovieDataAPI;
