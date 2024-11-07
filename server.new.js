const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 4000;


app.use(cors());


app.get('/api/news', async (req, res) => {
    try {
      const response = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo');
      console.log('Dados da API:', response.data); // Adicione para verificar a saída no console do servidor
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Erro ao obter dados da API');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando aqui na porta http://localhost:${PORT}`);
  });