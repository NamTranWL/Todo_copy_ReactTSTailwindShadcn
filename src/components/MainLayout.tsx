import BoxLayer from "./BoxLayer";
import TodoList from "./TodoList";

export default function TodoInput() {
  return (
    <div
      className="[background:linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
                 [background-position:0_100%,0_calc(100%+4px),0_calc(100%+8px)]
                 [background-repeat:no-repeat]"
    >
      <div className="bg-white border border-zinc-200 shadow-lg w-full mt-[20px]">
        <BoxLayer />
        <TodoList />
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
