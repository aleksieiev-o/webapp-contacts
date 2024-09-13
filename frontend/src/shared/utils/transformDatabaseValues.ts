export const transformNullToUndefined = (payload: string | null | undefined): string | undefined => (payload === null ? undefined : payload);
