# Numeny MVP — Protótipo Visual

Protótipo visual em React/Vite do MVP do Numeny.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build

```bash
npm run build
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub chamado `numeny-mvp`.
2. Suba todos os arquivos deste projeto para o repositório.
3. No GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione **GitHub Actions**.
5. Faça push na branch `main`.
6. O workflow `.github/workflows/deploy.yml` vai gerar e publicar o site.

O link ficará no formato:

```text
https://SEU_USUARIO.github.io/numeny-mvp/
```

## Observações

- Este projeto é apenas visual/prototipável.
- Não possui Supabase, login real, banco de dados ou pedidos reais.
- O mapa é ilustrativo e não usa conexão externa, para evitar alerta de permissão no preview.
