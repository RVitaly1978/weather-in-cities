export const getSearchResult = ({ id, center, place_name, text }) => {
  return {
    id,
    center,
    place: place_name,
    text,
  };
};
