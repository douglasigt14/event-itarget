"use client";

import React, { FC, useState, useEffect } from 'react';
import { Card, Button, Typography, TextField, Select, MenuItem, FormControl, Skeleton } from '@mui/material';
import InputMask from 'react-input-mask';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Event from '../interfaces/Events';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'





const Signup: FC = () => {
	const router = useRouter();


	const [formData, setFormData] = useState({
		name: '',
		cpf: '',
		email: '',
		events: []
	});

	const alertSucess = () => {
		Swal.fire({
		  title: 'Inscrição feita com sucesso!',
		  icon: 'success'
		});
	  };

	  const alertError = () => {
		Swal.fire({
		  title: 'Não foi possivel realizar a inscrição',
		  icon: 'error'
		});
	  };

	  const alertWarning = () => {
		Swal.fire({
		  title: 'Os eventos selecionados estão conflitando',
		  icon: 'warning'
		});
	  };


	  


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
				let temp_events = data.filter(item => item.status === true).map(item => {
					return {
						...item,
						start_date_br: format(new Date(item.start_date), 'dd/MM/yyyy', { locale: ptBR }),
						end_date_br: format(new Date(item.end_date), 'dd/MM/yyyy', { locale: ptBR }),
					};
				});;
				let temp_options = temp_events.filter(item => item.status === true).map(item => item.name);

				setEvents(temp_events);
				
			} catch (error) {
			}
		};

		fetchData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// Se o campo for o campo 'events', certifique-se de que o valor é um array
		const updatedValue = name === 'events' ? (value as any[]) : value;

		setFormData((prevData) => ({
			...prevData,
			[name]: updatedValue,
		}));
	};

	const hasDateConflict = (selectedEvents: Event[]): boolean => {
		const selectedDates = selectedEvents.map(event => ({
		  start_date: new Date(event.start_date),
		  end_date: new Date(event.end_date),
		}));
	  
		for (let i = 0; i < selectedDates.length - 1; i++) {
		  for (let j = i + 1; j < selectedDates.length; j++) {
			if (
			  (selectedDates[i].start_date <= selectedDates[j].end_date &&
				selectedDates[i].end_date >= selectedDates[j].start_date) ||
			  (selectedDates[j].start_date <= selectedDates[i].end_date &&
				selectedDates[j].end_date >= selectedDates[i].start_date)
			) {
			  // Conflito de datas encontrado
			  return true;
			}
		  }
		}

		return false;
	  };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const selectedEvents = events.filter(event => formData.events.includes(event.id));
		console.log(selectedEvents);

		if (hasDateConflict(selectedEvents)) {
			// Exibir mensagem de erro
			alertWarning();
			return;
		}

		try {
			const response = await fetch('http://localhost:8080/api/singup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				alertError();
				throw new Error('Erro ao enviar inscrição');
			}

			alertSucess();
		} catch (error) {
			alertError();
		}finally {
			router.push('/');
		  }
	};



	let result = (loadding ?
		<Skeleton
			variant="rectangular"
			width="100%"
			height={500}
		/>
		: <div>
			<Typography variant="h5">Inscreva-se</Typography>
			<form onSubmit={handleSubmit}>
				<Card className="mt-6">
					<FormControl className='container'>
						<div className='conteiner-item'>
							<TextField
								label="Nome"
								name="name"
								required
								value={formData.name}
								onChange={handleChange}
								fullWidth
								margin="normal"
							/>
						</div>

						<div className='conteiner-item'>
							<InputMask
								mask="999.999.999-99"
								maskChar=""
								value={formData.cpf}
								onChange={handleChange}
							>
								{() => (
									<TextField
										required
										label="CPF"
										name="cpf"
										fullWidth
										margin="normal"
									/>
								)}
							</InputMask>
						</div>
						<div className='conteiner-item'>
							<TextField
								label="Email"
								required
								name="email"
								value={formData.email}
								onChange={handleChange}
								fullWidth
								margin="normal"
							/>
						</div>

						<div className="conteiner-item">
							<Typography variant="body2">Voce pode se inscrever em quantos eventos desejar</Typography>
							<Typography variant="caption">* Contanto que sejam em dias e horarios diferentes</Typography>
							<Select
								className="conteiner-select"
								multiple
								name="events"
								required
								value={formData.events}
								onChange={handleChange}
							>
								{events.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										<Typography variant="body2">
											{option.name} | <Typography variant="caption">{option.start_date_br} à {option.end_date_br}</Typography>
										</Typography>
									</MenuItem>
								))}
							</Select>
						</div>




						<Button className='mt-4' type="submit" variant="outlined" color="primary">
							Inscrever-se
						</Button>
					</FormControl>
				</Card>
			</form>
		</div>);

	return result;
};

export default Signup;