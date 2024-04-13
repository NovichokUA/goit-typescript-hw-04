import React, { useReducer } from "react";

type State = {
  isRequestInProgress: boolean;
  RequestStep: "start" | "pending" | "finished" | "idle";
};

type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

const initialState: State = {
  isRequestInProgress: false,
  RequestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      return { ...state, isRequestInProgress: true, RequestStep: "start" };
    case "PENDING_REQUEST":
      return { ...state, isRequestInProgress: true, RequestStep: "pending" };
    case "FINISH_REQUEST":
      return { ...state, isRequestInProgress: false, RequestStep: "finished" };
    case "RESET_REQUEST":
      return { ...state, isRequestInProgress: false, RequestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.RequestStep}</p>
    </div>
  );
}

export default RequestComponent;
