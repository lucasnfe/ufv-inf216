---
type: assignment
date: 2023-09-01T08:00
title: 'P2: Pong'
permalink: /avaliacoes/p2-pong/
hide_from_announcments: false
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
due_event: 
    type: due
    date: 2023-09-08T07:30:00+2:00
    description: 'Entrega P2: Pong'
---

## Introdução

Um dos primeiros e mais populares jogos da era do fliperama é o Pong, desenvolvido pela Atari em 1972. O pong simula um jogo de tênis de mesa, onde cada jogodar controla verticalmente uma raquete posicionada em uma das extremidades da tela, com o objetivo de rebater uma bola de tal maneira que o oponente não consiga rebater de volta. Cada vez que um jogador não consegue rebater uma bola, o oponente recebe um ponto. O jogo termina quando um dos jogadores completa 11 pontos. Tanto as raquetes e a bola, quanto as marcações de meio de campo e de pontuação, são representados por retângulos brancos. O video a seguir mostra um gameplay do jogo original:

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/e4VRgY3tkh0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="">
    </iframe>
</div>

## Objetivo

Nesse projeto, você irá desenvolver uma versão de 1 jogador do jogo Pong em C++ e SDL. Nessa versão, o jogador controla a raquete com o objetivo de rebater a bola contra a parede o maior número de vezes possível. Primeiro, você irá criar o laço principal do jogo (*game loop*) com uma taxa de quadros (*framerate*) dinâmica, que processa entradas do teclado, atualiza os objetos do jogo e renderiza os quadros. A modelagem de objetos terá uma arquitetura híbrida, com hierarquia de classes e componentes. Em seguida, você irá utilizar essa estrutura para definir os objetos de jogo do pong. O video a seguir mostra um gameplay da versão que você irá implementar:

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/-mM9fSVLPlc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Inicialização

Aceite o projeto *p2-pong* no GitHub classroom [[nesse link]](https://classroom.github.com/a/qhHAuinC) e clone o seu novo repositório no seu computador:

```
# Substitua <GITHUB_USERNAME> pelo seu usuário do GitHub
git clone https://github.com/ufv-inf216/p2-pong-<GITHUB_USERNAME>.git
```

## Código Base

Abra o projeto *p2-pong* na CLion e, antes de começar a sua implementação, verique com cuidado as definições de métodos e atributos de cada classe:

- **Game**

   Classe responsável por inicializar, gerenciar o laço principal e finalizar o jogo. 

- **Actor**

    Classe base para todos os objetos do jogo, contendo atributos para transformação (translação, rotação e escala) e métodos para processamento de eventos
    de entrada, atualização e gerenciamento de componentes. 

- **Component**

    Classe base para todos os componentes do jogo, contendo métodos para processamento de eventos de entrada e atualização. 

- **DrawComponent**

    Componente de desenho de objetos com retângulos coloridos. 

- **Ball**

    Classe que estende Actor para representar a bola do jogo Pong.
    
- **Paddle**

    Classe que estende Actor para representar a raquete do jogo Pong.

## Instruções

### **Parte 1: Game Loop**

Na primeira parte, você irá implementar o laço principal do jogo utilizando uma abordagem de taxa de quadros dinâmica.

- **Game.cpp**

    1. **Estenda o método *Inicialize* para inicializar o contador de tempo *mTicksCount***

        Utilize a função [`SDL_GetTicks()`](https://wiki.libsdl.org/SDL2/SDL_GetTicks) para inicializar o atributo
        `mTicksCount`, de tal forma que ele represente o tempo (em milisegundos) decorrido desde a inicialização da SDL.

    2. **Implemente o método *RunLoop* para executar o laço principal do jogo**

        Escreva um laço `while` que é executado enquanto o atributo `mIsRunning` for verdadeiro. Dentro do laço, execute 
        os métodos `ProcessInput()`, `UpdateGame()` e  `GenerateOutput()`, nessa ordem.

    3. **Implemente o método UpdateGame para controlar a taxa de atualização de quadros**

       1. Utilize a função [`SDL_TICKS_PASSED()`](https://wiki.libsdl.org/SDL2/SDL_TICKS_PASSED) para garantir que pelo menos 
       16 milissegundos tenham se passado desde o último quadro (`mTicksCount + 16`);
       
       2. Utilize a função [`SDL_GetTicks()`](https://wiki.libsdl.org/SDL2/SDL_GetTicks) para obter o tempo (em ms) decorrido até o quadro atual e subtraia por `mTicksCount`, obtendo o tempo (em ms) entre o quadro atual e o passado. Converta o resultado para segundos e armazene o resultado em uma variável do tipo float chamada deltaTime;
       
       3. Verifique se deltaTime é superior a 0.05 segundos e, se for, limite-a para 0.05 segundos;
       
       4. Utilize a função [`SDL_GetTicks()`](https://wiki.libsdl.org/SDL2/SDL_GetTicks) para atualizar o contador de tempo `mTicksCount`.

       5. Chame a função `UpdateActors(deltaTime)` para atualizar os objetos do jogo.

### **Parte 2: Modelo de Objetos**

Na segunda parte, você irá implementar uma estrutura de objetos com hierarquia de classes e componentes.

- **Actor.cpp**

    1. **Implemente o construtor *Actor* para adicionar o objeto ao jogo**

        Utilize a função `AddActor` do jogo (`mGame`) para adicionar o novo objeto (`this`) ao jogo.

    2. **Implemente o destruidor *~Actor* para remover o objeto ao jogo**

        1. Utilize a função `RemoveActor` do jogo (`mGame`) para remover esse objeto (`this`) do jogo;

        2. Percorra o vetor de componentes `mComponents` deletando (`delete`) cada um deles e, em seguida, limpe (`clear`) o vetor de componentes.

    3. **Implemente o método *Update* para atualizar os componentes**

        Verifique se o objeto está no estado `mState` ativo (`ActorState::Active`). Se estiver, percorra o vetor de componentes, chamando a função `Update(deltaTime)` para cada um deles e, em seguida, chame a função `OnUpdate(deltaTime)`.

    4. **Implemente o método *ProcessInput* para processar a entrada**

        De forma similar ao método Update, verifique se o objeto está no estado `mState` ativo (`ActorState::Active`). Se estiver, percorra o vetor de componentes, chamando a função `ProcessInput(keyState)` para cada um deles e, em seguida, chame a função `OnProcessInput(keyState)`.

- **DrawComponent.cpp**

    1. **Implemente o construtor *DrawComponent* para adicionar o componente desenhável ao jogo**

        Utilize a função `AddDrawable` do jogo (`mOwner->GetGame()`) para adicionar esse (`this`) componente ao vetor de objetos desenháveis do jogo.

    2. **Implemente o construtor *~DrawComponent* para remover o componente desenhável ao jogo**

        Utilize a função `RemoveDrawable` do jogo (`mOwner->GetGame()`) para remover esse (`this`) componente ao vetor de objetos desenháveis do jogo.

    3. **Implemente o método *Draw* para desenhar um quadrado**

        1. Utilize a função `SDL_SetRenderDrawColor` para alterar a cor do renderer para branco;

        2. Crie um retângulo `SDL_Rect` para representar o objeto visualmente;

        3. Desenhe o retângulo criado com a função `SDL_RenderFillRect`.

- **Game.cpp**

    1. **Implemente o método *UpdateActors* para atualizar os objetos do jogo**

        1. Atribua verdadeiro para `mUpdatingActors` e, em seguida, escreva um laço para percorrer todos os elementos do vetor de objetos ativos `mActors`, chamando a função `Update(deltaTime)` para cada um deles. Ao final do laço, atribua falso para `mUpdatingActors`;

        2. Escreva um laço for para percorrer todos os elementos do vetor de objetos pendentes `mPendingActors`, adicionando-os ao vetor de objetos ativos `mActors`. Após o laço, remova todos os elementos do vetor de objetos pendentes `mPendingActors`;

        3. Crie um vetor chamado `deadActors` para armazenar os objetos a serem destruídos. Depois, escreva um laço for para percorrer todos os elementos do vetor de objetos ativos `mActors`, adicionando os que estiverem no estado `Actor::EDead` ao vetor de objetos mortos `deadActors`;

        4. Escreva um laço for para percorrer todos os elementos do vetor `deadActors` e removê-los um-a-um.

    2. **Implemente o método *AddActor* para adicionar objetos ao jogo**

        Verifique se o jogo está atualizando objetos (`mUpdatingActors == true`). Se estiver, adicione o novo objeto `actor` ao final do vetor de objetos pendentes `mPendingActors`, se não, ao final do vetor de objetos ativos `mActors`.

    3. **Implemente o método *RemoveActor* para remover objetos do jogo**

        1. Procure pelo objeto a ser removido no vetor de objetos pendentes `mPendingActors`. Se encontrar, remova-o;

        2. Procure pelo objeto a ser removido no vetor de objetos ativos `mActors`. Se encontrar, remova-o.

    4. **Implemente o método *AddDrawable* para adicionar um componente visual ao jogo**

        1. Adicione o novo componente `drawable` ao final do vetor de componentes visuais `mDrawables`;

        2. Ordene (`std::sort`) o vetor de componentes visuais `mDrawables` de acordo com o índice estabelecido na criação do componente. Utilize a função
            `GetDrawOrder()` para acessar a ordem de desenho de um objeto.

    5. **Implemente o método *RemoveDrawable* para remover um componente visual ao jogo**

        Procure (`std::find`) pelo componente `drawable` no vetor de componentes visuais `mDrawables` e o remova (`erase`) desse vetor.

    6. **Estenda o método *ProcessInput* para passar os eventos de entrada aos objetos do jogo**

        1. Utilize a função [`SDL_GetKeyboardState`](https://wiki.libsdl.org/SDL2/SDL_GetKeyboardState) para acessar o estado do jogo. Salve o estado em uma variável `Uint8* state`;

        2. Percorra o vetor de objetos `mActors`, chamando a função `ProcessInput(state)` para cada um deles.

    7. **Estenda o método *GenerateOutput* para desenhar os componentes visuais**

        Percorra o vetor de componentes visuais `mDrawables` e chame a função `Draw(mRenderer)` para cada um deles.

    8. **Estenda o método *Shutdown* para deletar os objetos do jogo**

        Percorra o vetor de objetos `mActors` enquanto (`while`) ele tiver elementos (`!mActors.empty()`), deletando (`delete`) o último elemento do 
        vetor (`mActors.back()`). É necessário usar um laço while porque o método destruidor da classe Actor chama `RemoveActor` no objeto do jogo.

### **Parte 3: Objetos do Pong**

Na terceira, você irá utilizar a estrutura de objetos criada na parte anterior para criar os objetos do Pong: Ball e Paddle.

- **Paddle.cpp**

    1. **Implemente o construtor *Paddle* para adicionar um componente de desenho**

        Crie um novo componente visual `DrawComponent` e atribua ao ponteiro `mDrawComponent`.

    2. **Implemente o método *OnProcessInput* para atualizar a direção do movimento da raquete**

        1. Reinicialize a direção da raquete `mDir` para 0;

        2. Verifique se tecla w está sendo pressionada. Se estiver, altere a direção `mDir` para -1;

        3. Verifique se tecla s está sendo pressionada. Se estiver, altere a direção `mDir` para +1.
    
    3. **Implemente o método *OnUpdate* para atualizar a posição da raquete**

        1. Some à coordenada y da posição da raquete `pos.y`: a velocidade da raquete `mVerticalSpeed` multiplicada 
        pela sua direção `mDir` e pelo tempo decorrido desde o último quadro `deltaTime`;

        2. Limite a coordenada y da raquete para que ela não ultrapasse os limites superior e inferior da tela.
    
- **Ball.cpp**

    1. **Implemente o construtor *Ball* para adicionar um componente de desenho**

        Crie um novo componente visual `DrawComponent` e atribua ao ponteiro `mDrawComponent`.

    2. **Implemente o método *OnUpdate* para atualizar a posição da bola**

        1. Some à posição horizontal da bola `pos.x` a sua velocidade horizontal `mVelocity.x` multiplicado pelo tempo decorrido desde o último quadro (deltaTime);

        2. Some à posição vertical da bola `pos.y` a sua velocidade vertical `mVelocity.y` multiplicado pelo tempo decorrido desde o último quadro (deltaTime);

        3. Calcule a distância vertical absoluta entra a bola e a raquete. Utilize a função `paddle->GetPosition()` para acessar a posição da raquete;

        4. Verifique se a bola colidiu com a raquete. Se houve colisão, inverta (multiplique por -1) a velocidade horizontal da bola. Para que haja colisão, as seguintes condições devem ser verdadeiras:
            - A velocidade horizontal `mVelocity.x` da bola deve ser negativa;
            - A distância vertical absoluta entre a bola e a raquete deve ser metade da altura da raquete mais o tamanho da bola `mSize`. Utilize a função 
              `paddle->GetHeight()` para acessar a altura da raquete;
            - A posição horizontal da bola `pos.x` deve estar entre as posições dos lados esquerdo e direito da raquete.

        5. Verifique se a bola saiu pelo lado esquerdo da tela. Se saiu, finalize o jogo chamando a função Quit do jogo `GetGame()->Quit()`;

        6. Verifique se a bola colidiu com o lado direito da tela. Se houve colisão, inverta (multiplique por -1) a velocidade horizontal da bola. Para que haja colisão, a velocidade horizontal da bola `mVelocity.x` deve ser positiva e a posição horizontal da bola `pos.x` deve ser maior do que largura da tela menos a metade do tamanho da bola `mSize/2`. Utilize a função `GetGame()->GetWindowWidth()` para acessar a largura da tela;

        7. Verifique se a bola colidiu com o limite superior tela. Se houve colisão, inverta (multiplique por -1) a velocidade vertical da bola. Para que haja colisão, a velocidade vertical da bola `mVelocity.y` deve ser negativa e a posição vertical da bola `pos.y` deve ser menor ou igual ao limite superior da tela (zero) mais a metade do tamanho da bola (`mSize/2`).

- **Game.cpp**

    1. **Implemente o método *InitializeActors* para inicializar a bola e a raquete**

        1. Crie a raquete `mPaddle` e inicialize sua posição com o método `SetPosition`;

        1. Crie a bola `mBall` e inicialize sua posição e velocidade com os métodos `SetPosition` e `SetVelocity`, respectivamente.

### **Parte 4: Customização**

Na quarta, e última etapa, você irá ajustar as variáveis do jogo para criar uma versão única do Pong.

1. Escolha um novo tamanho de quadra (janela);

2. Defina um novo esquema de cores que modifique as cores do fundo, da raquete e da bola;

3. Escolha uma nova posição horizontal e uma velocidade de movimentação para raquete;

4. Altere a altura da raquete e o tamanho da bola.

## Submissão

Para submeter o seu trabalho, basta fazer o commit e o push das suas alterações no repositório que foi criado para
você no GitHub classroom.

```
git add .
git commit -m 'Submissão P2'
git push
```

## Barema

- Parte 1: Game Loop (10%)
- Parte 2: Modelo de Objetos (50%)
- Parte 3: Objetos do Pong (30%)
- Parte 4: Customização (10%)

## Referências

- Parte 1: 
    - [Game Programming in C++, Cap 1: The Game Loop and Game Class](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch01.xhtml#ch01lev2sec3)
    - [Game Programming in C++, Cap 1: Updating the Game](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch01.xhtml#ch01lev2sec11)

- Parte 2: 
    - [Game Programming in C++, Cap 2: Game Objects](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch02.xhtml#ch02lev2sec1)    

- Parte 3: 
    - [Game Programming in C++, Cap 1: Updating the Game](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch01.xhtml#ch01lev2sec11)