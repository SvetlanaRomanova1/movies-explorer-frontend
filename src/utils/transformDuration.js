function transformDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  }
  return `${hours}ч ${minutes}м`;
}

export default transformDuration;
