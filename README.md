# Convite digital da Laura

Arquivos principais:

- `index.html`: página web responsiva do convite.
- `card-1080x1350.html`: cartão vertical para feed/WhatsApp.
- `card-1080x1920.html`: cartão story/status.
- `styles.css`: visual, animações e responsividade.
- `script.js`: contagem regressiva, confetes e música.
- `local-server.js`: servidor Node para rodar localmente e no Render.
- `render.yaml`: configuração pronta para deploy no Render.
- `package.json`: scripts para iniciar e validar.

## Trocas rápidas

- Foto temática principal otimizada: `assets/laura-stitch-theme-web.jpg`.
- Galeria: adicione `assets/foto-1.jpg`, `assets/foto-2.jpg` e `assets/foto-3.jpg`.
- Música: o botão já toca uma melodia de aniversário no navegador. Se quiser trocar por arquivo depois, dá para adaptar para `assets/musica.mp3`.
- WhatsApp: em `index.html`, procure `5592999999999` e troque pelo número desejado.

## Como abrir

Com o servidor local:

```bash
npm start
```

Depois abra:

```text
http://127.0.0.1:8080/
```

Também dá para abrir `index.html` direto no navegador. Abra os arquivos `card-1080x1350.html` e `card-1080x1920.html` para visualizar os cartões nos tamanhos prontos.

Para exportar os cartões como imagem, abra o cartão no navegador e use uma captura de tela na resolução indicada.

## Deploy no GitHub e Render

1. Crie um repositório no GitHub.
2. Envie esta pasta para o repositório.
3. No Render, crie um novo **Web Service** ligado ao repositório.
4. O Render deve detectar o `render.yaml`.
5. Build command: `npm install`.
6. Start command: `npm start`.
