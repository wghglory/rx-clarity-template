export interface PageQuery {
  page: number;
  pageSize: number;
  sortAsc?: string; // field
  sortDesc?: string; // field
  filter?: string; // FIQL format. name==*s*;enabled==false
}
