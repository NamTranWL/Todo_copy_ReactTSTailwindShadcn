import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  toggleTodo,
  editTodo,
  removeTodo,
  selectFilter,
  selectTodos,
  selectLeftCount,
  clearCompleted,
  setFilter,
  selectFiltered,
} from "@/features/todos/TodosSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectFiltered);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const allTodos = useSelector(selectTodos);
  const left = useSelector(selectLeftCount);
  const filter = useSelector(selectFilter);
  const hasTodos = allTodos.length > 0;
  return (
    <div>
      <div>
        <ul className="flex flex-col px-6 py-4">
          {todos.map((t) => {
            const isEditing = editingId === t.id;
            return (
              <li
                key={t.id}
                className="group flex gap-3 border-b border-zinc-100 py-4 min-h-[35px] transition
                             has-[:focus-within]:border-red-500
                             has-[:focus-within]:ring-2 has-[:focus-within]:ring-red-500/40"
              >
                <div className="flex items-center w-full">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => dispatch(toggleTodo(t.id))}
                      className={cn("peer sr-only", isEditing && "invisible")}
                    />
                    <span
                      className={cn(
                        "m-[15px] h-[30px] w-[30px] rounded-full border border-stone-500 grid place-items-center text-emerald-500",
                        "peer-checked:after:content-['✓'] peer-checked:after:text-emerald-500 peer-checked:after:text-lg peer-checked:border-emerald-500",
                        isEditing && "invisible"
                      )}
                    />
                  </label>

                  {isEditing ? (
                    <textarea
                      onFocus={(e) => {
                        const len = e.currentTarget.value.length;
                        e.currentTarget.setSelectionRange(len, len);
                      }}
                      className="edit mt-2 px-2 py-2 w-full h-10 outline-none text-2xl resize-none overflow-y-auto break-words"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => setEditingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") return setEditingId(null);
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          const text = editingText.trim();
                          if (!text) return;
                          dispatch(editTodo({ id: t.id, text }));
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                      rows={1}
                      style={{ maxHeight: "80px" }}
                    />
                  ) : (
                    <div
                      onDoubleClick={() => {
                        setEditingId(t.id);
                        setEditingText(t.text);
                      }}
                      className="h-full w-full items-center flex"
                    >
                      <label
                        className={cn(
                          "flex-1 ml-2 text-2xl break-words max-w-full",
                          t.completed && "line-through opacity-60"
                        )}
                        style={{ wordBreak: "break-word" }}
                      >
                        {t.text}
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center w-[50px]">
                  <button
                    className="text-3xl mr-[10px] mb-[10px] destroy ml-auto text-zinc-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => dispatch(removeTodo(t.id))}
                  >
                    ×
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {hasTodos && (
        <div className="border-t border-zinc-200 bg-white p-[5px]">
          <ul className="grid grid-flow-col place-items-center min-h-[35px]">
            <span className="todo-count text-xl mr-4">
              <strong className="text-xl font-normal">{left}</strong>{" "}
              {left === 1 || left === 0 ? "item" : "items"} left!
            </span>

            <div className="grid grid-flow-col place-items-center gap-[10px]">
              {(["all", "active", "completed"] as const).map((f) => (
                <li key={f}>
                  <div className="py-[5px] has-[:focus]:ring-3 has-[:focus]:ring-red-300 rounded-sm hover:border-[#b83f45] hover:border-1">
                    <a
                      href="#/"
                      className={cn(
                        "px-[10px] py-[5px] rounded-sm border",
                        filter === f
                          ? "border-[#b83f45] border-2"
                          : "border-transparent"
                      )}
                      onClick={() => dispatch(setFilter(f))}
                    >
                      {f[0].toUpperCase() + f.slice(1)}
                    </a>
                  </div>
                </li>
              ))}
            </div>

            <li>
              <button
                className="ml-4 hover:underline"
                onClick={() => dispatch(clearCompleted())}
              >
                Clear completed
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
