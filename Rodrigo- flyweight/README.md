# Flyweight

## Propósito

O Flyweight é um padrão de projeto estrutural que permite a você colocar mais objetos na quantidade de RAM disponível ao compartilhar partes comuns de estado entre os múltiplos objetos ao invés de manter todos os dados em cada objeto.

## Problema

Para se divertir após longas horas de trabalho você decide criar um jogo simples: os jogadores estarão se movendo em um mapa e atirado uns aos outros. Você escolhe implementar um sistema de partículas realístico e faz dele uma funcionalidade distinta do jogo. Uma grande quantidades de balas, mísseis, e estilhaços de explosões devem voar por todo o mapa e entregar adrenalina para o jogador.

Ao completar, você sobe suas últimas mudanças, constrói o jogo e manda ele para um amigo para um test drive. Embora o jogo tenha rodado impecavelmente na sua máquina, seu amigo não foi capaz de jogar por muito tempo. No computador dele, o jogo continuava quebrando após alguns minutos de gameplay. Após algumas horas pesquisando nos registros do jogo você descobre que ele quebrou devido a uma quantidade insuficiente de RAM. Acontece que a máquina do seu amigo é muito menos poderosa que o seu computador, e é por isso que o problema apareceu facilmente na máquina dele.

O verdadeiro problema está relacionado ao seu sistema de partículas. Cada partícula, tais como uma bala, um míssil, ou um estilhaço era representado por um objeto separado contendo muita informação. Em algum momento, quando a destruição na tela do jogadora era tanta, as novas partículas criadas não cabiam mais no RAM restante, então o programa quebrava.

![picture1](https://refactoring.guru/images/patterns/diagrams/flyweight/problem-pt-br.png?id=c265abed7fcf731d0bc2ffa0e6434ea7)

## Solução

Olhando de perto a classe Partícula, você pode notar que a cor e o campo sprite consomem muita memória se comparado aos demais campos. E o pior é que esses dois campos armazenam dados quase idênticos para todas as partículas. Por exemplo, todas as balas têm a mesma cor e sprite.

![picture2](https://refactoring.guru/images/patterns/diagrams/flyweight/solution1-pt-br.png?id=b473e0d7b210adeb3d5432e373489321)

Outras partes do estado de uma partícula, tais como coordenadas, vetor de movimento e velocidade, são únicos para cada partícula. Afinal de contas, todos os valores desses campos mudam com o tempo. Esses dados representam todo o contexto de mudança na qual a partícula existe, enquanto que a cor e o sprite permanecem constante para cada partícula.

Esse dado constante de um objeto é usualmente chamado de estado intrínseco. Ele vive dentro do objeto; outros objetos só podem lê-lo, não mudá-lo. O resto do estado do objeto, quase sempre alterado “pelo lado de fora” por outros objetos é chamado estado extrínseco.

O padrão Flyweight sugere que você pare de armazenar o estado extrínseco dentro do objeto. Ao invés disso, você deve passar esse estado para métodos específicos que dependem dele. Somente o estado intrínseco fica dentro do objeto, permitindo que você o reutilize em diferentes contextos. Como resultado, você vai precisar de menos desses objetos uma vez que eles diferem apenas em seu estado intrínseco, que tem menos variações que o extrínseco.

![picture3](https://refactoring.guru/images/patterns/diagrams/flyweight/solution3-pt-br.png?id=6cb98174409f3c9e4356288399e5c457)

Vamos voltar ao nosso jogo. Assumindo que extraímos o estado extrínseco de nossa classe de partículas, somente três diferentes objetos serão suficientes para representar todas as partículas no jogo: uma bala, um míssil, e um pedaço de estilhaço. Como você provavelmente já adivinhou, um objeto que apenas armazena o estado intrínseco é chamado de um flyweight.

## Armazenamento do estado extrínseco

Para onde vai o estado extrínseco então? Algumas classes ainda devem ser capazes de armazená-lo, certo? Na maioria dos casos, ele é movido para o objeto contêiner, que agrega os objetos antes de aplicarmos o padrão.

No nosso caso, esse seria o objeto principal Jogo que armazena todas as partículas no campo partículas. Para mover o estado extrínseco para essa classe você precisa criar diversos campos array para armazenar coordenadas, vetores, e a velocidade de cada partícula individual. Mas isso não é tudo. Você vai precisar de outra array para armazenar referências ao flyweight específico que representa a partícula. Essas arrays devem estar em sincronia para que você possa acessar todos os dados de uma partícula usando o mesmo índice.

![picture4](https://refactoring.guru/images/patterns/diagrams/flyweight/solution2-pt-br.png?id=2138f9da653564e8baf8fdab5fe2c9e0)

Uma solução mais elegante é criar uma classe de contexto separada que armazenaria o estado extrínseco junto com a referência para o objeto flyweight. Essa abordagem precisaria apenas de uma única array na classe contêiner.

Calma aí! Não vamos precisar de tantos objetos contextuais como tínhamos no começo? Tecnicamente, sim, mas nesse caso, esses objetos são muito menores que antes. Os campos mais pesados foram movidos para alguns poucos objetos flyweight. Agora, milhares de objetos contextuais podem reutilizar um único objeto flyweight pesado ao invés de armazenar milhares de cópias de seus dados.

## Flyweight e a imutabilidade

Um flyweight deve inicializar seu estado apenas uma vez, através dos parâmetros do construtor. Ele não deve expor qualquer setter ou campos públicos para outros objetos.

## Fábrica Flyweight

Para um acesso mais conveniente para vários flyweights, você pode criar um método fábrica que gerencia um conjunto de objetos flyweight existentes. O método aceita o estado intrínseco do flyweight desejado por um cliente, procura por um objeto flyweight existente que coincide com esse estado, e retorna ele se for encontrado. Se não for, ele cria um novo flyweight e o adiciona ao conjunto.

## Estrutura do Flyweight

![picture5](https://refactoring.guru/images/patterns/diagrams/flyweight/structure.png?id=c1e7e1748f957a4792822f902bc1d420)

## Aplicabilidade

Utilize o padrão Flyweight apenas quando seu programa deve suportar um grande número de objetos que mal cabem na RAM disponível.

O benefício de aplicar o padrão depende muito de como e onde ele é usado. Ele é mais útil quando:

1. uma aplicação precisa gerar um grande número de objetos similares
2. isso drena a RAM disponível no dispositivo alvo
3. os objetos contém estados duplicados que podem ser extraídos e compartilhados entre múltiplos objetos

## Como implementar:

1. Divida os campos de uma classe que irá se tornar um flyweight em duas partes: o estado intrínseco e o estado extrínseco
2. Deixe os campos que representam o estado intrínseco dentro da classe, mas certifique-se que eles sejam imutáveis. Eles só podem obter seus valores iniciais dentro do construtor.
3. Examine os métodos que usam os campos do estado extrínseco. Para cada campo usado no método, introduza um novo parâmetro e use-o ao invés do campo.
4. Opcionalmente, crie uma classe fábrica para gerenciar o conjunto de flyweights. Ela deve checar por um flyweight existente antes de criar um novo. Uma vez que a fábrica está rodando, os clientes devem pedir flyweights apenas através dela. Eles devem descrever o flyweight desejado ao passar o estado intrínseco para a fábrica.
5. O cliente deve armazenar ou calcular valores para o estado extrínseco (contexto) para ser capaz de chamar métodos de objetos flyweight. Por conveniência, o estado extrínseco junto com o campo de referência flyweight podem ser movidos para uma classe de contexto separada.





 

