const express = require ('express');
const axios = require ('axios');
const cors = require ('cors');


const app = express ();
const PORT = 3000;

app.use(cors());

app.get('/api/elements', async (req, res) => {
    try {
      const response = await axios.get(
        'https://olinda.bcb.gov.br/olinda/servico/CCR/versao/v1/odata/InstituicoesFinanceirasAutorizadas?$format=json'
      );

      console.log(response.data);  
      
      const bankElements = response.data.value.map((item) => ({
        CodigoSicap: item.CodigoSicap,  
        Nome: item.Nome,
        Praca: item.Praca || 'N/A',  
        Pais: item.Pais || 'Brasil', 
      }));

      res.json(bankElements);
    } catch (error) {
      console.error('Erro ao buscar dados do Banco Central:', error);
      res.status(500).json({ message: 'Erro ao buscar dados do Banco Central' });
    }
});
  
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });