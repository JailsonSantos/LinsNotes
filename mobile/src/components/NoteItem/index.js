import React from 'react';
import { Box, Title } from './styles';

export default ({ data, index, onPress }) => {

  return (
    <Box onPress={() => onPress(index)} underlayColor="#F58225">
      <Title>{data.title}</Title>
    </Box>
  );
}