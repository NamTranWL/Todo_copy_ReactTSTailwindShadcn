import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";

const PERSIST_KEY = "todos:v1";

function loadState() {
  if (typeof window === "undefined") return undefined; // SSR guard
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function saveState(state: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch {}
}

const rootReducer = combineReducers({
  todos: todosReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const { todos } = store.getState();
    saveState({ todos });
  });
}

export type AppDispatch = typeof store.dispatch;
