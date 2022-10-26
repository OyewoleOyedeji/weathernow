export default (theme: string) => {
  const colorMode = useColorMode();
  colorMode.preference = theme;
  return (useState("showThemeOptions").value = false);
};
