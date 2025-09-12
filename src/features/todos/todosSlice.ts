// features/todos/todosSlice.ts
import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TodosState, Filter } from "../types";

const initialState: TodosState = { items: [], filter: "all" };

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      prepare(text: string) {
        return { payload: { id: nanoid(), text: text.trim() } };
      },
      reducer(state, action: PayloadAction<{ id: string; text: string }>) {
        if (!action.payload.text) return;
        state.items.unshift({
          id: action.payload.id,
          text: action.payload.text,
          completed: false,
          createdAt: Date.now(),
        });
      },
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const t = state.items.find((i) => i.id === action.payload);
      if (t) {
        t.completed = !t.completed;
        t.updatedAt = Date.now();
      }
    },
    editTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const t = state.items.find((i) => i.id === action.payload.id);
      if (t) {
        const text = action.payload.text.trim();
        if (text) {
          t.text = text;
          t.updatedAt = Date.now();
        }
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCompleted(state) {
      state.items = state.items.filter((i) => !i.completed);
    },
    toggleAll(state, action: PayloadAction<boolean | undefined>) {
      const next = action.payload ?? !state.items.every((i) => i.completed);
      state.items.forEach((i) => (i.completed = next));
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  editTodo,
  removeTodo,
  clearCompleted,
  toggleAll,
  setFilter,
} = todosSlice.actions;
export default todosSlice.reducer;

// Selectors
export function selectTodos(s: { todos: TodosState }) {
  return s.todos.items;
}
export function selectFilter(s: { todos: TodosState }) {
  return s.todos.filter;
}

export const selectFiltered = createSelector(
  [selectTodos, selectFilter],
  function (items, filter) {
    if (filter === "active")
      return items.filter(function (i) {
        return !i.completed;
      });
    if (filter === "completed")
      return items.filter(function (i) {
        return i.completed;
      });
    return items;
  }
);

export const selectLeftCount = createSelector([selectTodos], function (items) {
  return items.filter(function (i) {
    return !i.completed;
  }).length;
});
