const jsonParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return {};
  }
};

export default jsonParse;
