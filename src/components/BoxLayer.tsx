import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addTodo, toggleAll, selectTodos } from "@/features/todos/TodosSlice";

export default function BoxLayer() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [draft, setDraft] = useState("");
  const allTodos = useSelector(selectTodos);
  const hasTodos = allTodos.length > 0;
  return (
    <div
      className="flex px-6 py-4 border-b border-zinc-200 items-center min-h-[35px] transition
                         has-[textarea:focus]:border-red-500  
                         has-[textarea:focus]:ring-2 has-[textarea:focus]:ring-red-500/40"
    >
      <div className="transition has-[button:focus]:border-red-500 has-[button:focus]:ring-2 has-[button:focus]:ring-red-500/40">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-10 w-10 mx-[10px] my-[20px] hover:bg-transparent disabled:bg-white disabled:text-white disabled:cursor-not-allowed",
            active ? "text-black" : "text-zinc-400"
          )}
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
            if (!draft.trim()) return;
            dispatch(addTodo(draft.trim()));
            setDraft("");
          }
        }}
        rows={1}
        style={{ maxHeight: "80px" }}
      />
    </div>
  );
}
