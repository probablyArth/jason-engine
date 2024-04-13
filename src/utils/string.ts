export const normalizeTableName = (tableName: string): string => {
  // eslint-disable-next-line no-useless-escape
  const normalizedName = tableName.replace(/[^\w\-]/g, '');
  return normalizedName;
};
