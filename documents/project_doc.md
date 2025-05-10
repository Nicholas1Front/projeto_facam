#Cores 

    Cor preta = #000 ;
    Cor azul = #00489A ; 
    Cor branca = #FFF ;
    Cor cinza = #E6E7E8 ou #dddddd ;  


## Fontes e tamanhos

Para títulos grandes : h2 com tamanho de 55px, porém analisar a necessidade do design

Para titulos pequenos/ médios : h3 com tamanho de 22px - 19px

Para subtitulos (abaixo do titulo) : h4 com tamanho padrão do css

Para paragrafos : p com tamanho de 16px ou 17px , verificar necessidade do design

Para links com ícones : usar a com tamanho normal sem text-decoration : underline , para o ícone i um tamanho razoável é de 50px - 60px dependendo do uso.

Para botões : o tamanho depende do uso , entretanto sempre manter border-radius : 25px e padding : razoável

## Estrutura 

Agrupar e estruturar o código para que o mesmo tenha a estrutura organizada e limpa , exemplo : 

register-section
    register-container
        title-container
        register-form-container
        submit-container

No CSS sempre usar globalização de classes , evitar o uso de ID somente quando necessário. Da mesma forma que a estrutura do HTML , o CSS deve ser utilizado assim : .register-section > .register-container > .title-container

No Javascript os elementos, funções , event listerners devem ser separados de acordo com próprio código html , exemplo : 

// register-section

// elements
const registerSection = ...

//functions

async function showSomething(...){
    ...
}

//event listeners or booting

btn.addEventListener... ou showSomething();


## Github 

Para subir as mudanças para o github somente usar a branch main , e sempre avisar de mudança no código.