# Anotações Iniciais para o Projeto de Desenvolvimento da Plataforma Web FACAM

## Ferramentas, Linguagens e Outras Tecnologias
- **Linguagens**: HTML, CSS, JavaScript
- **Bibliotecas**: [Swiper.js](https://swiperjs.com) (carrossel de imagem)
- **Ferramentas de Design**: Photoshop
- **IDE**: VS Code
- **Repositório**: GitHub
- **Comunicação**: WhatsApp, Discord

## Esboço Inicial (Estrutura e Design)
Para um esboço inicial, será feito um exemplo de como queremos que o website fique depois de pronto, no Photoshop. Em relação à estrutura, após o término do esboço no Photoshop, será definida a estrutura de tags e, por fim, os padrões de estilos que serão utilizados. Exemplo:

```css
/* No arquivo .css usaremos para Títulos a tag <h3> com um font-size de 24px */
h3 {
    font-size: 24px;
}
```

O tempo estimado para a produção do esboço inicial será de no máximo 2 semanas, contando a partir do começo de Julho de 2024.

## GitHub / Drive
Para sermos profissionais, utilizaremos o GitHub da melhor forma possível, e com o tempo aprenderemos a atualizar os repositórios. Se alguém presente tiver experiência com GitHub, será muito apreciada!

Como alternativa, o uso do Google Drive também será de suma importância para compartilhamento de arquivos. Ou seja, para qualquer alteração ou atualização do projeto, a comunicação é extremamente importante.

## Prazo para Entrega do Projeto
Não nos preocuparemos com prazos rígidos, porém temos que ter em mente que o prazo máximo de entrega será no Projeto Integrador II ou até o término do curso.

Tempo estimado: 8 meses no máximo.

## Estruturação de Arquivos
Inicialmente, os arquivos estarão organizados da seguinte maneira: aqueles que envolvem diretamente a aplicação e aqueles que não envolvem diretamente a aplicação. Os arquivos que não envolvem diretamente a aplicação, mas são importantes para o projeto, ficarão na pasta `/documents`, e os arquivos que envolvem diretamente a aplicação ficarão na pasta `/app`, com a seguinte estrutura:

```md
documents/
  ...
app/
  images/
  scripts/
  styles/
  README.md
```

Além disso, para este primeiro momento, é necessário levantar a questão de modulação do projeto. Para que este projeto não seja muito confuso e extenso, sugiro que cada página HTML tenha seu próprio arquivo de estilo:

```md
app/
  index.html (home)
  areaAluno.html
  ...
  styles/
    indexStyle.css
    areaAlunoStyle.css
    ...
```

## Desenvolvimento nas Linguagens
Uma questão simples, porém que precisa ser abordada: o nome de cada tag, classe ou id tem que ser autodescritivo e de fácil entendimento. Devido à nossa inexperiência, o uso de comentários é indicado caso seja necessário. Exemplo:

```html
<section class="apresentation-container">
    <div class="icons-control"></div>
    <!-- O bloco de código acima diz respeito à parte do site "Conheça a Facam",
         com os links relacionados às páginas do site como "a Instituição" -->
</section>
```

Em JavaScript, o processo de desenvolvimento não será diferente. Todas as variáveis, constantes e funções devem ser autodescritivas e de fácil entendimento, e comentários serão mais do que necessários.

A comunicação externa também será importante para que estejamos cientes de nomes, funções, etc. Outro fator de suma importância a ser abordado neste primeiro momento é a responsividade. Quando aplicada, é essencial que sejam comunicadas as mudanças e implementações feitas, pois essa é uma das partes mais vitais desse projeto.

Todas as diretrizes acima estão sendo pensadas visando a máxima produção e organização deste projeto. No entanto, a criatividade também é apoiada, pois o projeto é de todos nós!

## Reuniões da Equipe / Definição de Papéis
Como somos uma equipe pequena e este é um projeto simples, porém extenso, nenhum de nós ficará "preso" a uma única função. Sempre que tivermos dificuldade, pediremos ajuda um ao outro. Portanto, a definição de papéis será algo sempre muito "volátil", onde por meio dos canais de comunicação e reuniões de equipe definiremos as tasks e runs semanais ou mensais.

Quanto às reuniões de equipe, as mesmas serão definidas conforme o andamento do projeto, sejam elas presenciais (na faculdade) ou online. De todo modo, a maioria de nossas conferências serão por meio dos canais de comunicação e qualquer alteração no plano original será documentada.

## Outras Questões
Ainda existem muitas outras questões que precisam ser abordadas e discutidas, como:
- Escolha de imagens e ícones
- Escolha das bibliotecas e frameworks (se necessário)
- Disposição das informações
- Qual site será usado como modelo de desenvolvimento
- ...

Essas questões serão abordadas durante o desenvolvimento do projeto e pelos meios de comunicação. Qualquer mudança no plano original alterará a documentação do projeto.

## Por fim
Este arquivo tem como objetivo apresentar e relatar para todos nós as dimensões do problema que estamos lidando. Sempre que possível, lidaremos de uma maneira profissional e bem-humorada, pois precisamos de ânimo para tocar este projeto.

Este arquivo também vale como primeiro documento escrito para documentação oficial deste projeto. Ao longo do desenvolvimento, também desenvolveremos outras "notes" para documentarmos algumas questões e acompanharmos o desenvolvimento deste projeto.

"Vamos fazer nosso melhor! Conto com vocês."

## Sugestões
1. Criar uma conta Google para este projeto
