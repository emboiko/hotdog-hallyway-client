import { useStore } from "./storeProvider.js";

const useInject = (mapStore) => {
  const all = useStore();
  return mapStore(all.store);
};

export default useInject;
