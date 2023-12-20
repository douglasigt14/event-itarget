"use client";

import { Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import DataTable from './table';
import Event from '../interfaces/Events';
import { Skeleton, Typography } from '@mui/material';


const ListRegistered: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loadding, setLoading] = useState(true);


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div>
      <Typography variant="h5">Eventos</Typography>
      <Card className="mt-6">
        <DataTable data={events}></DataTable>
      </Card>
    </div>);
  return (
    result
  );
};

export default ListRegistered;