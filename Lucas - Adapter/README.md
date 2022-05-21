# Adapter

## Propósito

O Adapter é um padrão de projeto estrutural que permite objetos com interfaces incompatíveis colaborarem entre si.

##  Problema
Imagine que você está criando uma aplicação de monitoramento do mercado de ações da bolsa. A aplicação baixa os dados as ações de múltiplas fontes em formato XML e então mostra gráficos e diagramas maneiros para o usuário.

Em algum ponto, você decide melhorar a aplicação ao integrar uma biblioteca de análise de terceiros. Mas aqui está a pegadinha: a biblioteca só trabalha com dados em formato JSON.
Você poderia mudar a biblioteca para que ela funcione com XML. Contudo, isso pode quebrar algum código existente que depende da biblioteca. E pior, você pode não ter acesso ao código fonte da biblioteca para começo de conversa, fazendo dessa abordagem uma tarefa impossível.

## Analogia com o mundo real

Quando você viaja do Brasil para a Europa pela primeira vez, você pode ter uma pequena surpresa quando tenta carregar seu laptop. O plugue e os padrões de tomadas são diferentes em diferentes países. É por isso que seu plugue do Brasil não vai caber em uma tomada da Alemanha. O problema pode ser resolvido usando um adaptador de tomada que tenha o estilo de tomada Brasileira e o plugue no estilo Europeu.

###  Exemplos de código
 - [TypeScript](index.ts)
 - [PHP](index.php)
 - [python](main.py)
 
 #### Exemplo real com typeSCript
 - [Adpter](adapter.ts)

 # Referências
 - [Refactoring GURU](https://refactoring.guru/pt-br/design-patterns/adapter)

