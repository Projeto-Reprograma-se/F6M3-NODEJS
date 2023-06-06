const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
porta = 443;

const app = express();

// Configuração de middleware para tratar o envio de arquivos
app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const oldPath = files.file.filepath;
    const newPath = './enviodearquivo/' + files.file.originalFilename;
    const rawData = fs.readFileSync(oldPath);
    fs.writeFile(newPath, rawData, err => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao enviar arquivo');
      }
    })
    res.send('Arquivo enviado com sucesso!');
    res.end();
  });
});

// Rota principal que exibe a página HTML
app.get('/', (req, res) => {
  fs.readFile(`${__dirname}/p1.html`, 'utf8', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar página');
    }
    res.send(html);
  });
});

// Rota para listar os arquivos enviados
app.get('/uploads', (req, res) => {
  fs.readdir(`${__dirname}/enviodearquivo`, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao listar arquivos');
    }
    res.send(files);
  });
});

// Inicia o servidor na porta 443
app.listen(porta, () => console.log('Servidor iniciado na porta 443'));

// Listando arquivos
function listarArquivos(diretorio, arquivos) {

  if (!arquivos)
    arquivos = []
  let listagemArquivos = fs.readdirSync(diretorio)
  console.log(listagemArquivos)
}
listarArquivos('./enviodearquivo')
