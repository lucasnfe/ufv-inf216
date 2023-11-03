---
type: assignment
date: 2023-10-06T08:00
title: 'P5: Pacman'
permalink: /p5-pacman/
hide_from_announcments: false
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
due_event: 
    type: due
    date: 2023-11-07T07:30
    description: 'Entrega P5: Pacman'
---

## Introdução

O Pac-Man foi lançado originalmente para arcade pela empresa japonesa Namco em 1980 e é um dos jogos mais vendidos da história até hoje. O objetivo do jogo é comer todas as pastilhas colocadas no labirinto, evitando quatro fantasmas coloridos que perseguem o jogador – Blinky (vermelho), Pinky (rosa), Inky (ciano) e Clyde (laranja). Quando Pac-Man come todos as pastilhas, o jogador avança para o próximo nível. Além das pastilhas comuns, o labirinto contém 4 pastilhas especiais que o jogador pode comer para assustar os fantasmas. Quando os fantasmas estão assustados, o jogador pode comê-los, fazendo com que eles voltem para a casa dos fantasmas no centro do labirinto. Uma das grandes inovações do Pac-Man na época foi a inteligência artificial dos fantasmas, pois cada um deles tem um comportamento distinto para perseguir o jogador. O vídeo a seguir mostra um gameplay do jogo original:

<iframe width="560" height="315" src="https://www.youtube.com/embed/DRlQgdGLRP8?si=etDIJC3pIdoluAo4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Objetivo

O objetivo desse projeto é praticar a implementação de máquina de estados finita como técnica de inteligência artificial para controle reativo de personagens não controláveis por jogador (NPCs). Para isso, você irá implementar os comportamentos dos quatro fantasmas do Pac-Man. Primeiro, você irá construir o grafo que define os pontos de interesse no mapa bem como os caminhos que os fantasmas podem percorrer. Em seguida, você irá implementar o comportamento do primeiro fantasma, o Blinky (vermelho). Por fim, você irá utilizar essa implmentação inicial para implementar o comportamento dos fantasmas restantes. O vídeo a seguir mostra um gameplay da versão que você irá implementar:

<iframe width="560" height="315" src="https://www.youtube.com/embed/odc7vA75We0?si=9HYMX5gDOk-CgEhC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Inicialização

Aceite o projeto *p5-pacman* no GitHub classroom [[nesse link]](https://classroom.github.com/a/epK8Tngq) e clone o seu novo repositório no seu computador:

```
# Substitua <GITHUB_USERNAME> pelo seu usuário do GitHub
git clone https://github.com/ufv-inf216/p5-pacman-<GITHUB_USERNAME>.git
```

## Código Base

Abra o projeto *p5-pacman* na CLion e, antes de começar a sua implementação, verique com cuidado as definições de métodos e atributos de cada classe. O código base desse projeto foi construído a partir do código do projeto anterior [[P4: Super Mario Bros]](https://ufv-inf216.lucasnferreira.com/p4-smb/), portanto muitas das classes já foram introduzidas anteriormente. As novas classes desse projeto são:

- **FSMComponent**

    Componente que implementa uma máquina de estados finita para controle reativo dos fantasmas. 

- **FSMState**

    Interface para a criação de estados de uma máquina de estados finita. 

- **GhostState**

    Classe que estente `FMSState` para executar o comportamento compartilhado entre todos os estados dos fantasmas.     

- **ScatterState, ChaseState, FrightenedState e DeadState**

    Classes que estentem `FMSState` para executar os comportamentos específicos dos estados de dispersão, perseguição, assustado, e morto, respectivamente. 

- **PathNode**

    Classe que estende `Actor` para representar um nó do grafo de caminhos do mapa. 

- **Ghost**

    Classe que estende `Actor` para representar um fantasma do jogo.  
    
- **Item**

    Classe que estende `Actor` para representar um item do jogo.

- **Pacman**

    Classe que estende `Actor` para representar o jogador (Pac-Man).    

- **Wall**

    Classe que estende `Actor` para representar os muros do mapa (espaço).    

## Instruções

Os fantasmas no Pac-Man serão implementados com uma máquina de estados finita com quatro estados diferentes:

- **Dispersão**

    O fantasma desloca-se de sua posição atual até um vértice de dispersão `D` fixo no mapa. Quando `D` é alcançado, o fantasma deve circular em torno de `D` até que o estado mude. Cada fantasma tem um vértice de dispersão diferente.

- **Perseguição**

    O fantasma desloca-se de sua posição atual até um vértice de perseguição `G`, que normalmente é relativo à posição do Pac-Man. Cada fantasma tem um vértice de perseguição diferente.

- **Assustado**

    O fantasma escolhe um vértice aleatório para virar em cada cruzamento.

- **Morto**

    O fantasma volta para o vértice de morte no centro do labirinto dentro da casa dos fantasmas, onde ele voltará à vida.

A forma como os fantasmas se movimentam nos diferentes estados é a mesma. Cada vez que o fantasma atinge um novo vértice no grafo de caminhos, ele escolherá o vértice vizinho (diferente do anterior) que está mais próximo de seu vértice alvo. A única diferença é que cada estado tem uma lógica diferente para selecionar o vértice alvo. Isso significa que, uma vez que você implementar o estado de dispersão funcione corretamente, os outros estados darão muito menos trabalho para implementar. 

Um detalhe importante sobre o movimento dos fantasmas é que eles geralmente não se viram ao longo de um caminho. Por exemplo, se um fantasma viaja de um vértice `v` para outro `q`, ele não pode decidir dar meia volta e voltar para o nó `q`. Em cada cruzamento, o fantasma deve seguir em frente, virar à esquerda ou à direita. Há uma única exceção a esta regra, quando um fantasma inicialmente fica assustado, ele inverte a direção.

Nesse projeto você irá implementar apenas a primeira fase do Pac-man. Portanto, enquanto o labirinto ainda tiver pastilhas para serem comidas, os fantasmas devem alternar entre os estados de dispersão e perseguição. Sendo que o estado de disperção deve durar
5 segundos e o de perseguição 20 segundos. Os fantasmas só não estarão em um desses dois estados quando o Pac-Man comer uma pastilha, o que causará os fantasmas mudarem para o estado Assustado, onde devem ficar por `7` segundos. Se o Pac-man comer um fantasma enquanto eles estiverem no estado Assustado, esse fantasma deve mudar para o estado Morto, onde deve ficar até voltar para a casa dos fantasmas.

### **Parte 1: Grafo de Caminhos**

Na primeira parte, você irá construir o grafo de caminhos que os fanstasmas podem percorrer no labirinto. O grafo de caminhos está definido no arquivo `Levels/Paths.txt`: 

        ```
        A*XX*X**X**X..X**X**X*XX*B
        *....*.....*..*.....*....*
        *....X.....*..*.....X....*
        *....*.....*..*.....*....*
        X*XX*X**X**XXXX**X**X*XX*X
        *....*..*........*..*....*
        *....*..*........*..*....*
        X*XX*X..X**X..X**X..X*XX*X
        .....*.....*..*.....*.....
        .....X.....*..*.....X.....
        .....*..X**1XX2**X..*.....
        .....X..*...**...*..X.....
        .....*..*...**...*..*.....
        T*X**X**X..3GP4..X**X**X*T
        .....*..*........*..*.....
        .....*..*........*..*.....
        .....X..X**XXXX**X..X.....
        .....*..*........*..*.....
        .....*..*........*..*.....
        X*XX*X**X**X..X**X**X*XX*X
        *....*.....*..*.....*....*
        *....*.....*..*.....*....*
        X*X..X**X**X*MX**X**X..X*X
        ..*..*..*........*..*..*..
        ..*..*..*........*..*..*..
        X*X**X..X**X..X**X..X**X*X
        *..........*..*..........*
        *..........*..*..........*
        C*X**X**X**X**X**X**X**X*D
        ```

Esse arquivo define um grafo de caminhos com uma grade (grid) de caracteres, onde cada caracter define um tipo de vértice diferente:

- `X` representa um vértice no grafo de caminhos, ou seja, uma posição do labirinto que os fanstasmas podem utilizar para planejar seus caminhos. 
- `A`, `B`, `C` e `D` representam os vértices de dispersão dos fantasmas Blinky, Pinky, Inky e Clyde, respectivamente.
- `1`, `2`, `3` e `4` representam os vértices de nascimento dos fantasmas Blinky, Pinky, Inky e Clyde, respectivamente.
- `M` representa o vértice de nascimento do jogador (Pac-Man).
- `P` representa o vértice de morte dentro da casa dos fantasmas para onde eles vão quando morrem.
- `G` representa vértices dentro da casa dos fantasmas onde eles podem se mover enquanto esperam para renascer.
- `T` representam vértices do tipo túnel, ou seja, posições que não são vizinhas na grade do labiritndo mas que são adjacentes no grafo de caminhos.
- `.` representa um espaço do labirinto que não pode ser utilizado para planejamento de caminhos dos fantasmas. Esses caracteres podem ser desconsiderados, pois são utilizados apenas para possibilitar que
o grafo seja definido em uma estrutura de grade (grid). 

Além disso, os caracteres são agrupados em três tipos diferentes para organizar o planejamento de caminhos dos fantasmas nos diferentes estados:

- *Default*: [`X`, `A`, `B`, `C`, `D`, `1`, `2`, `M`]
- *Ghost*: [`G`, `P`, `3`, `4`]
- *Tunnel*: [`T`]

As arestas do grafo de caminhos são definidas pelos caracteres `*` entre os vértices na grade do labirinto. Para que haja uma aresta entre dois vértices `v` e `q` no grafo, deve haver uma sequência vertical ou horizontal contígua de caracteres `*` entre `v` e `q`. Além disso, dois vértices adjacentes na grade também possuem arestas entre si no grafo de caminhos.

- **Game.cpp**

    1. **Implemente a função `BuildPathGraphVertices` para construir os vértices do grafo de caminhos**

        1. Carregue a grade do labirinto em uma matriz de caracteres

            A função `BuildPathGraphVertices` recebe como parâmetro o arquivo (`std::ifstream`) com a grade do labirinto. Para criar o grafo de caminhos, você terá que ler esse arquivo e armazená-lô na matriz de caracteres `txtGrid` mantendo a estrutura de grade do arquivo. Essa matriz é importante para determinar a vizinhança de um determinado vértice.

        2. Crie os vértices do grafo de caminhos

            Percorra as linhas e colunas da matriz `txtGrid` criando um vértice para cada caracter de caminho no labirinto (todos os listados acima, exceto  `*`). Para criar um vértice, basta instanciar um objeto do tipo `PathNode`. Você pode utilizar a função `IsPathNode` para verificar se um dado caracter é um vértice de caminho. 
            
            - Tipo do vértice
        
                Para instanciar um objeto `PathNode`, você terá que passar o tipo do vértice como parâmetro para o construtor. Por exemplo, para criar um vértice a partir do caracter `G` você terá que executar `new PathNode(this, PathNode::Ghost)`. Quando você criar um vértice dessa maneira, ele será automaticamente adicionado ao vetor `mPathNodes` da classe `Game`. Apesar disso, será mais fácil criar as arestas do grafo se você criar matriz temporária `nodeGrid` com a mesma estrutura da `txtGrid` (mesmo número de linhas e colunas), porém com ponteiros para os vértices criados (`PathNode *`) ao invés de caracteres (`char`).
            
            - Posição

                Depois de instanciar um vértice, você precisa definir sua posição `(x, y)` em função de suas coordenadas `(i, j)` na grade do labirinto. Formalmente, as posições `x` e `y` de um vértice são definidas por:
                
                - `x = STARTX + SPACING * i`
                - `y = STARTY + SPACING * j`
                    
                Onde `STARTX` e `STARTY` são as coordenadas do vértice mais acima e à esquerda do labirinto, `SPACING` é o tamanho de cada célula da grade, `i` é índice da coluna do vértice e `j` é o índice da linha. 

                Para os vértices de nascimento do jogador `M` e tunel `T`, você terá que subtrair metade do tamanho da célula
                do grid da coordenada `x -= SPACING / 2.0f` para centraliza-los no labirinto.

        3. Armazene os pontos de referência do labirinto

            Enquanto estiver percorrendo a matriz `txtGrid`, alguns vértices precisam ser armazenados nos objetos do jogo para faciliar a implementação da IA dos fantasmas. Para os vértices de disperção (`A-D`), você terá que utilizar a função `Ghost::SetScatterNode` para armazená-los nos respectivos fantasmas que os utilizam para dispersão. Para os vértices de nascimento (`1-4`), você terá que utilizar a função `Ghost::SetSpawnNode` para armazená-los nos objetos dos respectivos fantasmas que os utilizam para nascimento. Os objetos dos fantasmas Blinky, Pinky, Inky e Clyde estão armazenados nas posições 0, 1, 2 e 3 do vetor `mGhosts` da classe `Game`, respectivamente. Para o vértice de nascimento do jogador `M`, você terá que utilizar a função `Pacman::SetSpawnNode` para armazenar esse vértice no objeto que representa o Pac-Man.

            Para os vértices de túnel (`T`), você terá que armazená-los nos variáveis `mTunnelLeft` e `mTunnelRight` da classe
            `Game`, onde o primeiro armazena o túnel da esquerda e o segundo o da direita. Finalmente, para o vértice de morte
            (`G`), você terá que armazená-lo na variável `mGhostPen` da classe `Game`.

    2. **Implemente a função `BuildPathGraphEdges` para construir as arestas do grafo de caminhos**

        Percorra as linhas e colunas da matriz `txtGrid` verificando, para cada elemento `txtGrid[i][j]`, se existe um
        caminho à direita ou abaixo de `txtGrid[i][j]`. Para verificar se há um caminho à direita de `txtGrid[i][j]`, você pode percorrer as colunas `k = [j + 1, ..., numCols]` testando se o mesmo elemento na matriz `nodeGrid[i][j]` é 
        definido (diferente de `nullptr`). Além disso, você pode utilizar a função `IsPath` para testar se um caracter na grade é um vértice de caminho ou não. Se `nodeGrid[i][j]` for definido, você pode criar uma aresta entre `nodeGrid[i][j]` e `nodeGrid[i][k]`. Para isso, utilize a função `PathNode::AddAdjacent` tanto de `nodeGrid[i][j]` para `nodeGrid[i][k]` quanto de `nodeGrid[i][k]` para  `nodeGrid[i][j]`. Após criar as arestas, você pode pode parar de percorrer (`break`) essa coluna. A mesma ideia pode ser aplicada para construir uma aresta abaixo de `txtGrid[i][j]` caso haja um caminho nesse sentido. Note que você não precisa verificar se há caminhos acima ou à esquerda, pois quando você encontra um caminho, você adiciona arestas em ambas as direções. 

        Após percorrer toda a matriz `txtGrid`, percorra o vetor `mPathNodes` para encontrar por dois nós do tipo tunel e crie arestas entre eles.
    
### **Parte 2: Máquina de Estados Finita**

Na segunda parte, você irá implementar o componente `FSMComponent` para controlar os estados dos fantasmas.

- **FSMComponent.cpp**- 

    1. **Implemente a função `Start` para iniciar a execução da máquina de estados**

        Para dar inicio à execução da máquina de estados, basta alterar o valor da variável membro `mIsRunning` para verdadeiro e 
        alterar o estado (`SetState`) da máquina com estado `startState` passado como parâmetro. A máquina começa sua execução
        nesse estado. 

    2. **Implemente a função `SetState` para fazer a transição para um novo estado**

        Para fazer a transição de estados, você precisa primeiro verificar se o estado destino (parâmetro `stateName`) existe
        no mapa de estados `mStates`. Se não exister, interrompa a função (`return`). Caso contrário, você deve:

        1. Executar a função de saída do estado atual `mStates[mCurrentState]->Exit()`
        2. Resetar o contador de tempo `mStateTime` para zero
        3. Atualizar o estado atual `mCurrentState` para o estado destino `stateName`
        4. Executar a função de entrada do estado atual `mStates[mCurrentState]->Start()`

    3. **Implemente a função `Update` para atualizar o estado atual**

        Para atualizar o estado atual, primeiro você precisa verificar se a máquina está em execução `mIsRunning`. Se não estiver, interrompa a função. Caso contrário, incremente o contador de tempo `mStateTime` com o `deltaTime` e execute as funcões `Update(deltaTime)` e `HandleStateTransition(mStateTime)` para o estado atual,
        nessa ordem. 

    4. **Implemente a função `AddState` para adicionar um estado atual**

        Para adicionar um estado na máquina de estados, basta inserir o estado `state` passado como parâmetro no mapa de estados `mStates` com a chave `stateName`.

### **Parte 3: Estado Base**

Na teceira parte, você irá implementar o estado `GhostState` para executar a base de movimentação dos fantasmas. Todos os fantasmas, em qualquer estado, se movem em linha reta de um vértice `mPrevNode` para outro `mNextNode` visando alcançar um vértice alvo `mTargetNode`. Quando um fantasma chega em `mNextNode` vindo de `mPrevNode`, ele escolhe dentre os vizinhos de `mNextNode` direrentes de `mPrevNode` aquele com menor distância até `mTargetNode`. O que muda de um estado para outro é a lógica para escolher o vértice alvo `mTargetNode` e as restrições para escolher o próximo vértice `mNextNode`.

- **GhostState.cpp**- 

    1. **Implemente a função `Update` para o estado base**

        Primeiro, verifique se o próximo vértice do fantasma `mGhost->GetNextNode()` não é nulo. Se for, interrompa a função. Caso contrário, utilize a função `Intersect` do componente `AABBColliderComponent` do fantasma para verificar se ele colidiu com esse vértice. Se houve colisão, atualize a posição do fantasma com a posição do vértice e zere a velocidade do fantasma. Em seguida, utilize a função `FindNextNode` para decidir o novo próximo vértice do fantasma. Nesse momento, você só irá chamar essa função. Ela será implementada de maneira diferente para cada estado nas próximas partes do trabalho. Se a função `FindNextNode` retornar um vértice não nulo, atualize o vértice anterior do fantasma `mGhost->SetPreviousNode()` para o vértice com o qual ele acabou de colidir e atualize o próximo vértice `mGhost->SetNextNode()` para aquele retornado por `FindNextNode`. Após essas atualizações, chame a função `UpdateDirection()`, que será implementada em seguida, para atualizar a direção do fantasma considerando os vértices atualizados. Por fim, ao final da função `Update`, atualize a velocidade do fantasma (`SetVelocity()`) para que ele se mova para sua nova direção `mGhost->GetDirection()` com velocidade máxima `mGhost->GetForwardSpeed()`.

    2. **Implemente a função `UpdateDirection` para atualizar a direção do fantasma**

        Para atualizar a direção do fantasmas basta subtrair o próximo vértice `mGhost->GetNextNode()` pelo vértice anterior `mGhost->GetPreviousNode()` e normalizar o resultado. Assumindo que o resultado foi armazenado em uma vetor (`Vector2`) chamado `newDirection`, verifique se o próximo vértice e o vértice anterior são do tipo `PathNode::Type::Tunnel` e se forem, inverta a direção  de `newDirection`. Por fim, atualize a direção do fantasma com `mGhost->SetDirection(newDirection);`

    3. **Implemente a função `FindNearestNode` para encontrar o vértice mais próximo de uma determina posição**

        Essa função recebe como parâmetro um vetor de vértices `nodes`, uma posição `targetPosition` e dois conjuntos, 
        `ignoreTypes` e `ignoreNodes`. Procure no vetor `nodes` pelo vértice mais próximo de `targetPosition`, ignorando os vértices de qualquer tipo presente em `ignoreTypes` e qualter vértice presente em `ignoreNodes`.

### **Parte 4: Estado de Dispersão**

Na quarta parte, você irá implementar o estado `ScatterState` para dispersar os fantasmas.

- **ScatterState.cpp**

    1. **Implemente a função `Start` para inicializar o estado de dispersão**

        Para iniciar o estado de dispersão, basta utilizar a função `SetTargetNode()` para alterar o vértice alvo do fantasma para o seu vértice de dispersão `GetScatterNode()` e a função `SetForwardSpeed` para alterar a velocidade do fantasma para `90.0f`.

    2. **Implemente a função `FindNextNode` para escolher um vértice vizinho**

        Lembre-se que a função `FindNextNode` é chamada quando o fantasma colide com o próximo vértice `mNextNode` atual. Utilize a função `FindNearestNode` implementada anteriormente para buscar pelo vértice vizinho mais próximo do vértice alvo `mGhost->GetTargetNode()`. Passe como parâmetro para essa função o vetor de vizinhos de `mNextNode` e a posição do vértice alvo. Passe também um mapa `set<PathNode *>ignoreNode` contendo o vértice anterior do fantasma e outro mapa `set<PathNode::Type>ignoreType` contendo os tipos `Ghost` e `Tunnel`. Para acessar os visiznhos de `mNextNode` você pode usar a função `mGhost->GetNextNode()->GetAdjacents()`.

        Note que a chamada da função `FindNearestNode` pode retornar vazio caso o fantasma esteja dentro da casa de fantasmas. Por isso, você terá que fazer uma segunda tentativa, dessa vez permitindo vértices do tipo `Tunnel` (continue ignorando o vértice anterior). Caso essa segunda tentativa também não funcione, faça uma terceira tentativa permitindo todos os tipos de vértices, inclusive o vértice anterior. Após essa terceira tentativa, retorne o vértice `nextNode` encontrado.

    3. **Implemente a função `HandleStateTransition` para fazer a transição de estados quando necessário**

        O estado de disperção sempre dura 5 segundos. Portanto, verifique se o contador de tempo do estado `stateTime`
        é maior que `5.0f`, se for, altere o estado do fantasma (`mFSM->SetState`) para `"chase"`.

Ao final da Parte 4, qunado você começar o jogo e mover o Pac-Man, você deveria ver o fantasma vermelho se movendo para seu vértice de dispersão no canto esquerdo superior do labirinto. 

### **Parte 5: Estado de Perseguição**

Na quinta parte, você irá implementar o estado `ChaseState` para que os fantasmas persigam o jogador. O fantasma só chega nesse estado após passar 5 segundos no estado de dispersão.

- **ChaseState.cpp**

    1. **Implemente a função `Start` para inicializar o estado de perseguição**

        Para iniciar o estado de perseguição, basta alterar a velocidade do fantasma para `90.0f`. Diferente do estado de dispersão, nesse estado não alteramos o vértice alvo durante a inicialização pois ele será constantemente atualizado com relação à posição do jogador.

    2. **Implemente a função `FindNextNode` para escolher um vértice vizinho**

        Lembre-se que a função `FindNextNode` é chamada quando o fantasma colide com o próximo vértice `mNextNode` atual. Utilize a função `FindNearestNode` para buscar pelo vértice vizinho mais próximo do vértice alvo `mGhost->GetTargetNode()`. Na primeira tentativa, ignore os vértices do tipo `Ghost` e o vértice anterior do fantasma `mPrevNode`. Caso o resultado dessa tentativa seja nulo, faça um segunda tentativa sem nenhuma restrição de tipo ou vértice. Retorne o vértice `nextNode` encontrado.

    3. **Implemente a função `FindTargetState` para decidir o vértice alvo**

        Essa função deve retornar um vértice no grafo relativo à posição do Pac-man. Cada fantasma persegue o Pac-Man (i.e, escolhe o vértice alvo) de uma maneira diferente:

        - **Blinky (vermelho)**
            
            Persegue o vértice anterior `mPrevNode` do Pac-Man, ou seja, basta retornar um ponteiro para o `mPrevNode` do Pac-man. Você pode usar a função `GetPrevNode` do Pac-Man para acessar esse vértice. Lembre-se que o fantasma é um `Actor` e portanto ele tem acesso ao objeto `mGame` via a função `GetGame`, que por sua vez acesso ao Pac-man via a função `GetPlayer`. 

        - **Pinky (rosa)**

            Persegue o vértice `v` que fica 80 pixels à frente do Pac-Man. Utilize a função `GetPointInFrontOf` do Pac-Man
            para calcular o ponto `P` 80 pixels à sua frente. Em seguida, utilize a função `FindNearestNode` para encontra o vértice `v` do tipo `Default` (ignore os outros tipos) mais próximo de `P`. Retorne o vértice encontrado.

        - **Inky (ciano)**:

            Primeiro, obtenha um ponto `P` que esteja 40 pixels à frente do Pac-Man. Em seguida, crie um vetor `v` da posição do fantasma até `P`. Dobre o comprimento de `v` e adicione-o à posição do fantasma para obter um ponto `Q`. Em seguida, utilize a função `FindNearestNode` para encontrar o vértice do tipo `Default` (ignore os outros tipos) mais próximo de `Q`. Retorne o vértice encontrado.

        - **Clyde (laranja)**:

            Se a distância entre o fantasma e o jogador for maior que 150 pixels, então o fantasma tem como alvo o vértice anterior do Pac-Man `mPrevNode` (como Blinky). Caso contrário, o fantasma terá como alvo seu vértice de dispersão.

    4. **Implemente a função `HandleStateTransition` para fazer a transição de estados quando necessário**

        O estado de perseguição sempre dura 20 segundos. Portanto, verifique se o contador de tempo do estado `stateTime`
        é maior que `20.0f`, se for, altere o estado do fantasma (`mFSM->SetState`) para `"scatter"`.

### **Parte 6: Estado Assustado**

Na sexta parte, você irá implementar o estado `FrightenedState` para que os fantasmas fiquem assustando quando o jogador comer uma das quatro pastilhas grandes.

- **FrightenedState.cpp**

    1. **Implemente a função `Start` para inicializar o estado assustado**

        Para iniciar o estado assustato, altere o vértice alvo do fantasma para vazio `nullptr` e sua velocidade 
        para `65.0f`. Além disso, inverta o vértice anterior `mPrevNode` com o próximo vértice `mNextNode` do fantasma
        e atualize a direção com a função `UpdateDirection()`.

    2. **Implemente a função `FindNextNode` para escolher um vértice vizinho**

        Difentemente dos outros estados, quando estão assustados, os fantasmas não buscam o vértice adjacente mais próximo do vértice alvo, mas um vértice adjacente aleatório. Primeiro, tente escolher um vizinho aleatório do tipo `Default` (ignore os outros tipos) que não seja o vértice anterior. Se nenhum vértice satisfizer essa condição, tente escolher um vizinho aleatório que não seja o vértice anterior nem seja do tipo `Tunnel`. Se nenhum deles satisfizer essa segunda condição, então permita a escolha de qualquer vizinho aleatório.

    3. **Implemente a função `HandleStateTransition` para fazer a transição de estados quando necessário**

        O estado Assustado sempre dura 7 segundos. Portanto, verifique se o contador de tempo do estado `stateTime` é maior que `7.0f`, se for, altere o estado do fantasma (`mFSM->SetState`) para `"scatter"`.

### **Parte 7: Estado Morto**

Na última parte, você irá implementar o estado `DeadState` para que os fantasmas morram e voltem para a casa quando o jogador os comer no estado assustado. 

- **DeadState.cpp**

    1. **Implemente a função `Start` para inicializar o estado morto**

        Para iniciar o estado de dispersão, basta utilizar a função `SetTargetNode()` para alterar o vértice alvo do fantasma para o vértice da casa dos fantasmas e a função `SetForwardSpeed` para alterar a velocidade do fantasma para `125.0f`.
        Para acessar o vértice da casa dos fantasmas, utilize a função `GetGhostPen` da classe `Game`.

    2. **Implemente a função `FindNextNode` para escolher um vértice vizinho**

        Lembre-se que a função `FindNextNode` é chamada quando o fantasma colide com o próximo vértice `mNextNode` atual. Utilize a função `FindNearestNode` para buscar pelo vértice vizinho mais próximo do vértice alvo `mGhost->GetTargetNode()`. Na primeira tentativa, procure apenas pelos vizinhos do tipo `Ghost` (ignore os outros), excluindo o vértice anterior do fantasma `mPrevNode`. Caso o resultado dessa tentativa seja nulo, faça um segunda tentativa possibilitando vértices do tipo `Default` (continue ignorando `mPrevNode`). Caso o resultado nulo persista, faça uma terceira tentativa sem nenhuma restrição de tipo ou vértice. Retorne o vértice `nextNode` encontrado.

    3. **Implemente a função `HandleStateTransition` para fazer a transição de estados quando necessário**

        O estado Morto é o único que não usa o tempo como condição de transição. Nesse estado, para mudar de estado, você terá que verificar se o fantasma colidiu com o vértice da casa dos fantasmas. Se colidiu, altere o estado para `"scatter"`. Utilize a função `GetGhostPen` da classe `Game` para acessar o vértice da casa dos fantasmas e a função `Intersect` do `AABBColliderComponent` para verificar essa colisão.

## Submissão

Para submeter o seu trabalho, basta fazer o *commit* e o *push* das suas alterações no repositório que foi criado para
você no GitHub classroom.

```
git add .
git commit -m 'Submissão P5'
git push
```

## Barema

- Parte 1: Grafo de Caminhos (20%)
- Parte 2: Máquina de Estados Finita (10%)
- Parte 3: Estado Base (15%)
- Parte 4: Estado de Dispersão (15%)
- Parte 5: Estado de Perseguição (20%)
- Parte 6: Estado Assustado (10%)
- Parte 7: Estado Morto (10%)

## Referências

- [Game Programming Patterns, Cap 7, State](https://gameprogrammingpatterns.com/state.html)
- [The Pacman Dossier](https://pacman.holenet.info/#Chapter_1)