"use client";

import { Card } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import Event from '../interfaces/Events';
import { MenuItem, Skeleton, Typography, Select } from '@mui/material';
import TableBasic from './table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ListRegistered: FC = () => {
  const [list, setList] = useState([]);
  const [loadding, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("3");


  

  const labelsHeader = ["Nome", "CPF", "E-mail"];


  const handleChange = (event) => {
    setSelectedEvent(event.target.value);
  };


  
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
				let temp_events = data.filter(item => item.status === true).map(item => {
					return {
						...item,
						start_date: format(new Date(item.start_date), 'dd/MM/yyyy', { locale: ptBR }),
						end_date: format(new Date(item.end_date), 'dd/MM/yyyy', { locale: ptBR }),
					};
				});;
				let temp_options = temp_events.filter(item => item.status === true).map(item => item.name);

				setEvents(temp_events);
				
			} catch (error) {
			}
		};

		fetchData();
	}, []);


  let result = (loadding ? <Skeleton
    variant="rectangular"
    width="100%"
    height={500}
  /> :
    <div>
      <Typography variant="h5">Lista de Inscritos</Typography>
      <Card className="mt-6">
              <div className="conteiner-item">
							<Select
								className="conteiner-select"
								name="events"
								required
								value={selectedEvent}
								onChange={handleChange}
							>
								{events.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										<Typography variant="body2">
											{option.name} 
										</Typography>
									</MenuItem>
								))}
							</Select>
              </div>
          <TableBasic  labelsHeader={labelsHeader} data={list}></TableBasic>
      </Card>
      
    </div>);
  return (
    result
  );
};

export default ListRegistered;