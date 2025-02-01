export const getColorFromUsername = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = (hash & 0x00ffffff).toString(16).toUpperCase();
  color = color.padStart(6, "0");

  // 明るさを調整するために、各色成分を少し明るくする
  const r = Math.min(255, parseInt(color.substring(0, 2), 16) + 50);
  const g = Math.min(255, parseInt(color.substring(2, 4), 16) + 50);
  const b = Math.min(255, parseInt(color.substring(4, 6), 16) + 50);

  return (r << 16) + (g << 8) + b;
};
