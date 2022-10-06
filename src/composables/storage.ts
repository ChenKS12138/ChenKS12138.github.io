import { ref, watch } from "vue";


export function useLocalStorage<TValue extends any>(key: string, defaultValue?: TValue) {

  const val = ref<TValue>((typeof window?.localStorage === 'undefined' ? defaultValue : tryJsonParse(window.localStorage.getItem(key))) as TValue);

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(val.value))
  })

  return val;
}

function tryJsonParse(str: string | null) {
  try {
    return JSON.parse(str || '');
  } catch (_err) {
    return null;
  }
}