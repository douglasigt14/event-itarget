"use client";

import { Card, Text, Title } from '@tremor/react';
import React, { FC, useState, useEffect } from 'react';
import Event from '../interfaces/Events';
import { Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SingupProps {}

const Singup: FC<SingupProps> = () => {
  return (
    <div>
      <Card>
        <Title>Inscreva -se</Title>
        <Text>Você pode se inscrever em quantos eventos desejar</Text>
        <Text> </Text>
      </Card>
    </div>
  );
};

export default Singup;