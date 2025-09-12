import InputTodo from "./components/input";
import { Menu, ListChecks, Settings } from "lucide-react";
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <aside
        className="fixed inset-y-0 left-0 w-[250px] bg-white border-r border-zinc-200 p-4 hidden md:flex flex-col mb-[60px]"
        aria-label="Sidebar"
      >
        <div className="ml-[20px]">
          <div className="mt-[20px]">
            <p className="text-xl font-semibold ">React</p>
            <div className="mt-2 text-sm">
              <p>React</p>
              <a
                href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react"
                className="text-red-600 hover:underline "
              >
                Source
              </a>
              <p className="mt-[10px]">TypeScript + React</p>
              <a
                href="https://todomvc.com/examples/typescript-react"
                className="text-red-600 hover:underline"
              >
                Demo
              </a>
              ,{" "}
              <a
                href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react"
                className="text-red-600 hover:underline"
              >
                Source
              </a>
            </div>
          </div>

          <div className="border-l-4 border-[#b83f45] pl-3 italic text-sm text-zinc-600 mt-[20px] mb-4 bg-zinc-50 p-3 relative">
            <p>
              React is a JavaScript library for creating user interfaces. Its
              core principles are declarative code, efficiency, and flexibility.
              Simply specify what your component looks like and React will keep
              it up-to-date when the underlying data changes.
            </p>
            <p className="text-right text-[#b83f45] mt-2">React</p>
          </div>

          <div>
            <p className="mt-[20px] font-semibold">Official Resources</p>
            <ul className="list-disc list-inside marker:text-black mt-[10px] text-sm text-red-600 space-y-1">
              <li>
                <a href="https://react.dev/learn">Quick Start</a>
              </li>
              <li>
                <a href="https://react.dev/reference/react">API Reference</a>
              </li>
              <li>
                <a href="https://petehuntsposts.quora.com/React-Under-the-Hood">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="https://react.dev/community">React Community</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mt-[20px]">Community</p>
            <ul className="list-disc list-inside marker:text-black ml-4 text-sm text-red-600 mt-[5px]">
              <li>
                <a href="https://stackoverflow.com/questions/tagged/reactjs">
                  ReactJS on Stack Overflow
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-4 text-xs italic mt-[20px]">
            <p>
              If you have other helpful links to share, or find any of the links
              above no longer work, please{" "}
              <a
                href="https://github.com/tastejs/todomvc/issues"
                className="text-red-600"
              >
                let us know
              </a>
              .
            </p>
          </div>
        </div>
      </aside>

      {/* Main: có margin-left để tránh đè lên aside */}
      <section className="md:ml-72 p-4 md:p-10">
        {/* Card Todo giữ style gọn gàng giống TodoMVC */}
        <section className="mx-auto max-w-xl">
          <h1 className="text-8xl leading-none text-[#b83f45] text-center mb-4 md:mb-8">
            todos
          </h1>

          {/* Component hiện tại của bạn */}
          <InputTodo />
        </section>
      </section>
    </div>
  );
}
