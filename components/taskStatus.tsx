import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

export const StatusIndicator = (props: { task?: Task }) => {
  switch (props?.task?.status) {
    case TaskStatus.Loading:
      return <FontAwesomeIcon className="ml-2" icon={faSpinner} spin={true} />;

    case TaskStatus.Error:
      if (!props.task.errorMessage) break;
      return (
        <>
          : <span className="text-red-500">{props.task.errorMessage}</span>
        </>
      );
  }

  return <></>;
};
