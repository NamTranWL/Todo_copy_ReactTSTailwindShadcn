import InputTodo from "./components/MainLayout";
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <section className="md:ml-72 p-4 md:p-10">
        <section className="mx-auto max-w-xl">
          <h1 className="text-8xl leading-none text-[#b83f45] text-center mb-4 md:mb-8">
            todos
          </h1>
          <InputTodo />
        </section>
      </section>
    </div>
  );
}
