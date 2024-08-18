export function debounce<T extends unknown[]>(
  this: unknown,
  func: (...args: T) => void,
  timeout = 300,
) {
  let timer: number | undefined;
  return (...args: T): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
