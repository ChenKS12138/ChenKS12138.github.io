import { useFetch } from '@vueuse/core'

const BING_INFO_URL =
  "https://jsonp.afeld.me/?url=http%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1";

export function useBingInfo() {
  const { data, error } = useFetch(BING_INFO_URL);
  const persistence = useLocalStorage(BING_INFO_URL, [null, null]);

  watchEffect(() => {
    persistence.value = [data.value, error.value];
  })
  return [data, error];
}