"use client";

import React, { FC, useState } from 'react';
import { Card, Button, Typography, TextField, Select, MenuItem, FormControl } from '@mui/material';
import InputMask from 'react-input-mask';


interface SignupProps {}



const Signup: FC<SignupProps> = () => {

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    evento: '',
  });


  const [options, setOptions] = useState(['Opção 1', 'Opção 2', 'Opção 3']);

  const [selectedOption, setSelectedOption] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados do formulário para o backend ou fazer o que for necessário
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Typography variant="h5">Inscreva-se</Typography>
      <form onSubmit={handleSubmit}>
      <Card className="mt-6">
      <FormControl className='container'>
          <div className='conteiner-item'>
            <TextField
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </div>

          <div className='conteiner-item'>
            <InputMask
            mask="999.999.999-99"
            maskChar=""
            value={formData.cpf}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              value={selectedOption}
              onChange={handleChange}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
    </div>
  );
};

export default Signup;