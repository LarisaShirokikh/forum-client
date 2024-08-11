export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getLastSeenText = (lastSeen: string) => {
  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "онлайн";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} минут назад`;
  } else if (diffHours < 24) {
    return `${diffHours} часов назад`;
  } else {
    return `${diffDays} дней назад`;
  }
};
