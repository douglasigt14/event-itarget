import Main from './components/Main/main';



export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Main></Main>
    </main>
  );
}
