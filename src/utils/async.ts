export function sleep(ms: number): Promise<any> {
  // this function is supposed be "awaited" (because it returns a Promise),
  // although it not defined as async
  return new Promise((resolve) => setTimeout(resolve, ms));
}
