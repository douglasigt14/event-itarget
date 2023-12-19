"use client";

import { Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import DataTable from './table';
import Event from '../interfaces/Events';
import { Button, Skeleton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
          let data = new Date(item.start_date); 
          item.start_date = format(data, 'dd/MM/yyyy', { locale: ptBR });

          data = new Date(item.end_date); 
          item.end_date =  format(data, 'dd/MM/yyyy', { locale: ptBR });

          if(item.status){
            item.status =  <Button
            variant="text"
            color="primary"
            href={`/singup`}
          >
            Inscreva-se
          </Button>
          }
          else{
            item.status = <Button variant="text" color="error" >Encerrado</Button>;
          }
        });
        setEvents(temp_events);
      } catch (error) {
      }
    };

    fetchData();
  }, []);
  
let result = ( loadding  ? <Skeleton
  variant="rectangular"
  width="100%"
  height={500}
  /> :
    <div>
      <Typography variant="h5">Eventos</Typography>
      <Card className="mt-6">
        <DataTable   data={events}></DataTable>
      </Card>
    </div>);
  return (
    result  
  );
};

export default Main;