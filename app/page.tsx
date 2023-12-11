import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from '../src/components/Table/table';
import Event from '../src/interfaces/Event';
import Main from '../src/components/Main/main';



export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const events = [{name: "Douglas"}] as Event[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable data={events} />
      </Card> */}
      <Main></Main>
    </main>
  );
}
