export const nextSlotIndex = (
  key: string,
  index: number,
  length: number,
): number | null => {
  if (length <= 0) return null;
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  if (key === 'ArrowRight' || key === 'ArrowDown') return (index + 1) % length;
  if (key === 'ArrowLeft' || key === 'ArrowUp')
    return (index + length - 1) % length;
  return null;
};
