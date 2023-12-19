"use client";

import React, { FC, useState, useEffect } from 'react';
import { Card, Button, Typography, TextField, Select, MenuItem, FormControl, Skeleton } from '@mui/material';
import InputMask from 'react-input-mask';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Event from '../interfaces/Events';


interface SignupProps { }



const Signup: FC<SignupProps> = () => {

	const [formData, setFormData] = useState({
		nome: '',
		cpf: '',
		email: '',
		events: []
	});


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
				let temp_events = data.data.filter(item => item.status === true).map(item => {
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

	const handleChange = (e: ChangeEvent) => {
		const { name, value } = e.target;

		// Se o campo for o campo 'events', certifique-se de que o valor é um array
		const updatedValue = name === 'events' ? (value as any[]) : value;

		setFormData((prevData) => ({
			...prevData,
			[name]: updatedValue,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:8080/api/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Erro ao enviar inscrição');
			}

			console.log('Inscrição enviada com sucesso!');
			// Adicione aqui o que deseja fazer após o sucesso da inscrição
		} catch (error) {
			console.error('Erro ao enviar inscrição:', error);
			// Adicione aqui o que deseja fazer em caso de erro
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
								name="nome"
								value={formData.nome}
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
								value={formData.events}
								onChange={handleChange}
							>
								{events.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										<Typography variant="body2">
											{option.name} | <Typography variant="caption">{option.start_date} à {option.end_date}</Typography>
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