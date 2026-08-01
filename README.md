# Hélio Mendonça - Landing Page / Currículo

Landing page em formato de currículo/portfólio para **Hélio Mendonça**, construída com **HTML, CSS, Bootstrap e JavaScript**.

## Seções

- **Início** - Apresentação com efeito de digitação
- **Sobre** - Formação em Recursos Humanos e paixão por programação
- **Habilidades** - PHP, MySQL, HTML, CSS, JavaScript, Bootstrap, WordPress e Moodle
- **Serviços** - O que é oferecido
- **Links** - Atalhos para redes sociais e currículo
- **Contato** - Canais de contato direto (WhatsApp, e-mail e redes)

## Publicação no GitHub Pages

1. Crie um repositório no GitHub chamado `heliodm.github.io`.
2. Envie os arquivos para a branch `main` (ou `master`):
   ```bash
   git init
   git add .
   git commit -m "Landing page inicial"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/heliodm.github.io.git
   git push -u origin main
   ```
3. No GitHub, acesse **Settings > Pages** e defina a branch `main` como fonte (padrão para esse tipo de repositório).
4. Pronto! O site ficará disponível em `https://heliodm.github.io`.

## Executar localmente

Abra o `index.html` no navegador ou, para uma melhor experiência:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Personalização

- Edite os dados de contato (e-mail, LinkedIn, WhatsApp) em `index.html`.
- Substitua o arquivo `assets/CV-Helio-Mendonca.pdf` pelo currículo real.
- Ajuste cores em `css/style.css` através das variáveis em `:root`.
