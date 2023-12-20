"use client";

import { Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import Event from '../interfaces/Events';
import { Skeleton, Typography } from '@mui/material';
import TableBasic from './table';


const ListRegistered: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadding, setLoading] = useState(false);
  
  const data = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
    { id: 5, title: 'Item 5' },
    { id: 6, title: 'Item 6' },
    { id: 7, title: 'Item 7' },
    { id: 8, title: 'Item 8' },
    { id: 9, title: 'Item 9' },
    { id: 10, title: 'Item 10' },
    // Adicione mais itens conforme necessário
  ];


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div>
      <Typography variant="h5">Lista de Inscritos</Typography>
      <Card className="mt-6">

      </Card>
    </div>);
  return (
    result
  );
};

export default ListRegistered;