const loderWrapper = <T>(loader: () => T | Promise<T>) => {
  return async () => {
    try {
      const data = await Promise.resolve(loader());
      return data;
      // return {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export default loderWrapper;
