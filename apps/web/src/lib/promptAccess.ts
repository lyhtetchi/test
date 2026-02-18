export const getLockedPromptText = (text: string, isUnlocked: boolean) => {
  if (isUnlocked) return { visible: text, hidden: '' };
  const words = text.split(/\s+/);
  const visible = words.slice(0, 5).join(' ');
  const hidden = words.slice(5).join(' ');
  return { visible, hidden };
};
