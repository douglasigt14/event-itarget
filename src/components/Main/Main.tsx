"use client";

import { Title, Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import DataTable from '../Table/table';
import Event from '../../interfaces/Event';


interface MainProps {}

const Main: FC<MainProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadding, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://demo.ws.itarget.com.br/event.php');
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        setLoading(false);

        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title>Eventos</Title>
      <Card className="mt-6">
        <DataTable data={events}></DataTable>
      </Card>
    </div>
  );
};

export default Main;