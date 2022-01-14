import { useStore } from "/hooks/StoreProvider";

const useInject = (mapStore) => {
  const all = useStore();
  return mapStore(all.store);
};

export default useInject;
