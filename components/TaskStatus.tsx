export enum TaskStatus {
  Loading = "loading",
  Success = "success",
  Error = "error",
  Finish = "finish",
}

export interface Task {
  status?: TaskStatus;
  errorMessage?: string;
}
