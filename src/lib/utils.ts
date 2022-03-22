const ideFix = 0 as number;

export function getUid() {
  return (
    Math.round(Math.random() * 1e18 + 1e18).toString(36) +
    Date.now().toString(36)
  );
}
