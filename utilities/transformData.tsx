import { IActor } from "../models/actor";

export function transformDataIntoRows(
  data: IActor[],
  columnCount: number
): IActor[][] {
  const rows: IActor[][] = [];
  const rowCount = Math.ceil(data.length / columnCount);

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row: IActor[] = [];
    for (let colIndex = 0; colIndex < columnCount; colIndex++) {
      const itemIndex = rowIndex + colIndex * rowCount;
      if (itemIndex < data.length) {
        row.push(data[itemIndex]);
      } else {
        row.push({ id: -1, name: "" }); // Empty placeholder for alignment
      }
    }
    rows.push(row);
  }
  return rows;
}
