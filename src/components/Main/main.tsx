"use client";

import { Title, Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import DataTable from '../Table/table';
import Event from '../../interfaces/Event';
import { Button, Typography } from '@mui/material';
import {DivCenter} from "./style";


interface MainProps {}

const Main: FC<MainProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadding, setLoading] = useState(true);


  useEffect(() => {
    const url = "http://localhost:8080/api/events";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        setLoading(false);

        const data = await response.json();
        let temp_events = data.data;
        temp_events.forEach( ( item: any) => {
          if(item.status){
            item.status = <Button variant="outlined" color="primary">Inscreva-se</Button>;
          }
          else{
            item.status = <Button variant="outlined" color="error">Encerradas</Button>;
          }
        });
        setEvents(temp_events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5">Eventos</Typography>
      <Card className="mt-6">
        <DataTable data={events}></DataTable>
      </Card>
    </div>
  );
};

export default Main;