export const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const shuffle = array =>
  array
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
