const isDarkRef = ref(false);

const isDark = useDark()
const toggleDark = useToggle(isDark)
isDarkRef.value = isDark.value;

export function useMyDark() {
  const toggleDarkWrapped = () => {
    toggleDark();
    isDarkRef.value = isDark.value;
  }

  return [isDarkRef, toggleDarkWrapped] as const;
}