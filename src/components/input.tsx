// App.tsx
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  editTodo,
  removeTodo,
  clearCompleted,
  toggleAll,
  setFilter,
  selectTodos,
} from "@/features/todos/todosSlice";
import {
  selectFiltered,
  selectLeftCount,
  selectFilter,
} from "@/features/todos/todosSlice";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function TodoInput() {
  const dispatch = useDispatch();
  const todos = useSelector(selectFiltered);
  const left = useSelector(selectLeftCount);
  const filter = useSelector(selectFilter);
  const allTodos = useSelector(selectTodos);

  const hasTodos = allTodos.length > 0;

  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const [active, setActive] = useState(false);

  return (
    <div
      className="[background:linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
             [background-position:0_100%,0_calc(100%+4px),0_calc(100%+8px)]
             [background-repeat:no-repeat]"
    >
      <div className="bg-white border border-zinc-200 shadow-lg w-full mt-[20px] ">
        <div
          className="flex px-6 py-4 border-b border-zinc-200 items-center min-h-[35px] transition
        has-[input:focus]:border-red-500
        has-[input:focus]:ring-2 has-[input:focus]:ring-red-500/40"
        >
          <div
            className="transition
    has-[button:focus]:border-red-500
    has-[button:focus]:ring-2 has-[button:focus]:ring-red-500/40
  "
          >
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 mx-[10px] my-[20px] hover:bg-transparent disabled:bg-white disabled:text-white disabled:cursor-not-allowed ${
                active ? "text-black" : "text-zinc-400"
              }`}
              onClick={() => {
                if (!hasTodos) return;
                dispatch(toggleAll(undefined));
                setActive(!active);
              }}
              disabled={!hasTodos}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
          <textarea
            className="focus:outline-none text-2xl w-full h-10 italic resize-none overflow-y-auto break-words"
            placeholder="What needs to be done?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                dispatch(addTodo(draft));
                setDraft("");
              }
            }}
            rows={1}
            style={{ maxHeight: "80px" }}
          />
        </div>

        <div>
          <ul className="flex flex-col px-6 py-4">
            {todos.map((t) => (
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
                      className={`peer sr-only ${
                        editingId === t.id ? "invisible" : ""
                      }`}
                    />
                    <span
                      className="
        m-[15px] h-[30px] w-[30px] rounded-full border border-stone-500
        grid place-items-center text-emerald-500
        peer-checked:after:content-['✓'] peer-checked:after:text-emerald-500 peer-checked:after:text-lg
        peer-checked:border-emerald-500
      "
                      style={editingId === t.id ? { visibility: "hidden" } : {}}
                    />
                  </label>
                  {editingId === t.id ? (
                    <textarea
                      className="edit mt-2 px-2 py-2 w-full h-10 outline-none text-2xl resize-none overflow-y-auto break-words"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onBlur={() => {
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          dispatch(editTodo({ id: t.id, text: editingText }));
                          setEditingId(null);
                        }
                        if (e.key === "Escape") setEditingId(null);
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
                        className={`flex-1 ml-2 text-2xl break-words max-w-full ${
                          t.completed ? "line-through opacity-60" : ""
                        }`}
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
            ))}
          </ul>
        </div>
        {hasTodos && (
          <div className="border-t border-zinc-200 bg-white p-[5px]">
            <ul className="grid grid-flow-col place-items-center min-h-[35px] ">
              <span className="todo-count text-xl mr-4">
                <strong className="text-xl font-normal">{left}</strong>{" "}
                {left === 1 ? "item" : "items"} left!
              </span>
              <div className="grid grid-flow-col place-items-center gap-[10px]">
                {(["all", "active", "completed"] as const).map((f) => (
                  <li key={f}>
                    <a
                      href="#/"
                      className={`px-[10px] py-[5px] rounded-sm border ${
                        filter === f
                          ? "border-[#b83f45] border-1 ring-3 ring-red-300 shadow-red-200"
                          : "border-transparent hover:border-red-500"
                      }`}
                      onClick={() => dispatch(setFilter(f))}
                    >
                      {f[0].toUpperCase() + f.slice(1)}
                    </a>
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
      <div className="mt-[60px] space-y-[5px]">
        <p className="text-center text-xs mt-4 mb-8">
          Double-click to edit a todo
        </p>
        <p className="text-center text-xs mt-4 mb-8">
          Created by the TodoMVC Team
        </p>
        <p className="text-center text-xs mt-4 mb-8">Team Part of TodoMVC</p>
      </div>
    </div>
  );
}
