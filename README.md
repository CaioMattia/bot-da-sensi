# Sensi Pro

Gerador de sensibilidade para Free Fire baseado em estatísticas de jogadores profissionais. 

## Como funciona
Os valores gerados (Geral, Red Dot, Mira 2x, Mira 4x, Botão de Tiro e DPI) utilizam presets de pro players do cenário (como Nobru, Thurzin, Two9, Bak e Ghost) como base. O script adapta os atributos dinamicamente com base nas suas escolhas:

- **Plataforma:** Ajusta os ranges de DPI e filtros de jogadores base (Android, iOS ou Emulador).
- **Papel:** Modifica peso em miras específicas (Rushador ganha mais sensi em miras curtas; Suporte foca em precisão 4x, etc).
- **Sensibilidade baixa:** Aplica multiplicadores que reduzem ou aumentam a base geral dos eixos X e Y.

Há uma margem de variação (RNG) em cada cálculo para que a sensibilidade gerada seja única.

## Como utilizar
1. Abra o arquivo `index.html` no seu navegador web de preferência.
2. Selecione a sua plataforma, o seu papel in-game e indique se prefere sensibilidade baixa.
3. Clique em **Gerar Sensi**.
4. Use o botão **Copiar** para enviar o resultado para sua área de transferência.

## Tecnologias
- HTML5
- CSS3
- JavaScript (Vanilla)
