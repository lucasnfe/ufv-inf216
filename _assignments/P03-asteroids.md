---
type: assignment
date: 2023-09-22T07:30
title: 'P3: Asteroids'
permalink: /p3-asteroids/
hide_from_announcments: false
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
due_event: 
    type: due
    date: 2023-09-22T07:30
    description: 'Entrega P3: Asteroids'
---

## Introdução

Assim como o Pong (projeto anterior), o Asteroids (lançado pela Atari em 1979) também foi um dos jogos mais populares da era do fliperama. O asteroids é um jogo com uma temática espacial onde o jogador controla uma nave com o objetivo de atirar raios laser para destruir todos os asteroides que se movem no mapa sem colidir com nenhum deles. Quando o jogador destruir todos os asteroides do mapa, um número maior de asteroides do que o anterior será criado no mapa, aumentando a dificuldade do jogo. Se o jogador colidir com um asteroid, ele perderá uma vida. O jogo termina quando o jogador perder suas três vidas. O video a seguir mostra um *gameplay* do jogo original:

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/WYSupJ5r2zo?si=NNIkvpXUij-DR0Zc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Objetivo

Nesse projeto, você irá desenvolver as mecânicas princiais de movimentação, colisão e tiro do Asteroids em C++ e SDL. Nessa versão, o jogador poderá mover-se e atirar com a nave como no jogo original, destruindo os asteroides caso um laser os acerte. O jogo será reiniciado quando a nave colidir com um asteroide. Essa versão não conterá a mecânica de gerar três novos asteroides menores quando um grande é destruído e não terá progressão de dificuldade quando o jogador destruir todos os asteroides. 

Inicialmente você irá implementar os componentes `RigidBodyComponent` e `CircleColliderComponent` para movimentar e detectar as colisões dos objetos do jogo. Em seguida, você irá modificar o componente `DrawCollider` para desenhar os objetos simulando gráficos vetoriais. Por fim, você irá utilizar esses componentes para implementar uma nave que atira raios laser e gerar um dado número de asteroides com geometrias aleatórias.

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/WrbIiKNksL4?si=Qp5D_RNHu9K5nIg5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Inicialização

Aceite o projeto *p3-asteroids* no GitHub classroom [[nesse link]](https://classroom.github.com/a/5REg8Coo) e clone o seu novo repositório no seu computador:

```
# Substitua <GITHUB_USERNAME> pelo seu usuário do GitHub
git clone https://github.com/ufv-inf216/p3-asteroids-<GITHUB_USERNAME>.git
```

## Código Base

Abra o projeto *p3-asteroids* na CLion e, antes de começar a sua implementação, verique com cuidado as definições de métodos e atributos de cada classe. O código base desse projeto foi construído a partir do código do projeto anterior [[P2: Pong]](https://ufv-inf216.lucasnferreira.com/avaliacoes/p2-pong/), portanto muitas das classes já foram introduzidas anteriormente. As novas classes desse projeto são:

- **RigidBodyComponent**

    Componente de movimentação de objetos rígidos. 

- **CircleColliderComponent**

    Componente de detecção de colisão baseado em comparações entre círculos. 

- **Ship**

    Classe que estende `Actor` para representar a nave.
    
- **Asteroid**

    Classe que estende `Actor` para representar um asteroide.

- **Laser**

    Classe que estende `Actor` para representar uma partícula de laser, que é atirada pela nave quando o jogador pressiona a tecla **Espaço**.    

## Instruções

### **Parte 1: Movimentação de Objetos Rígidos**

Na primeira parte, você irá implementar os componentes `RigidBodyComponent` e `CircleColliderComponent` para movimentar e detectar as
colisões dos objetos do jogo.

- **RigidBodyComponent.cpp**

    1. **Implemente o método `ApplyForce` para adicionar uma força à acceleração**

        1. Adicione ao atributo `mAcceleration` a força `force`, passada como parâmetro, dividida pela massa `mMass` do objeto.

    2. **Implemente o método `Update` para calcular a nova posição do objeto utilizando o Método de Euler Semi-implícito**

        1. Atualize a velocidade `mVelocity` e a posição `position` do objeto utilizando o Método de Euler Semi-implícito.

        2. Utilize a função `Math::NearZero` para verificar se o comprimento do vetor velocidade `mVelocity` está próximo de `zero`. Se estiver, use a função `mVelocity.Set` para forçar velocidade `zero`. Isso evita movimentos muito pequenos.

        3. Utilize a função `mAcceleration.Set` para reinicializar a aceleração em `zero`.

        4. Some à rotação atual do objeto `rot` a velocidade angular `mAngularSpeed` multiplicada pelo `deltaTime`.

    3. **Implemente o método `ScreenWrap` para teletransportar os objetos para o lado oposto quando eles saírem da tela**

        1. Verifique se o objeto saiu pelo lado esquerdo da tela. Se tiver saído, altere sua posição horizontal para ser igual à largura da tela. Caso contrário, verifique se o objeto saiu pelo lado direito. Se tiver saído, altere sua posição horizontal para ser igual a zero.

        2. Verifique se o objeto saiu por cima da tela. Se tiver saído, altere sua posição vertical para ser igual à altura da tela. Caso contrário, verifique se o objeto saiu por baixo. Se tiver saído, altere sua posição vertical para ser igual a zero.

- **CircleColliderComponent.cpp**

    4. **Implemente o método `Intersect` para detectar a colisão de círculos com círculos**

        1. Calcule a distância quadrada entre o centro **desse círculo** `GetCenter` e o do **círculo c** `c.GetCenter`. Primeiro, subtraia do centro do primeiro círculo o centro segundo círculo e armazene o resultado em um vetor `diff`. Depois use o método `diff.LengthSq` para calcular a distância quadrada entre os centros e armazene o resultado em um escalar `distSq`.

        2. Calcule o quadrado das somas dos raios e armazene o resultado em um escalar `radiiSq`.

        3. Retorne verdadeiro se `distSq` é menor ou igual a `radiiSq`. Caso contrário, retorne falso.

### **Parte 2: Desenhos Vetoriais**

Na segunda parte, você irá modificar o componente `DrawComponent` para desenhar os objetos do jogo simulando gráficos vetoriais.

- **DrawComponent.cpp**

    1. **Implemente o método `DrawPolygon` para desenhar um polígono formado por um conjunto de vértices**

        1. Percorra do primeiro até o penúltimo vértice utilizando a função [[SDL_RenderDrawLine]](https://wiki.libsdl.org/SDL2/SDL_RenderDrawLine) para desenhar as linhas entre os vértices `i` e `i+1`.

        2. Utilize a função [[SDL_RenderDrawLine]](https://wiki.libsdl.org/SDL2/SDL_RenderDrawLine) para desenhar uma linha entre o último e o primeiro vértices.

    2. **Implemente o método `DrawCircle` para gerar e desenhar um conjunto de vértices em um círculo**

        1. Inicialize variável `angle` (float) com `zero`. Ela será utilizada para percorrer o arco de uma circunferência em intervalos angulares de tamanho fixo.

        2. Repita o seguinte procedimento para um dado número de vértices `numVertices`: 
            
            - Calcule a coordenada `x` do novo vértice multiplicando o raio da circunferência `radius` pelo cosseno do ângulo corrente `angle`; 
            
            - Calcule a coordenada `y` da mesma forma, porém multiplicando pelo seno do ângulo corrente; 
            
            - Adicione o vetor `(x,y)` ao conjunto de vértices `vertices`;
            
            - Incremente o ângulo corrente por `2*PI` dividido pelo número de vértices `numVertices`.

    3. **Implemente o método `Draw` para desenhar um objeto**

        1. Utilize a função `Matrix3::CreateRotation` para criar uma matriz de rotação com o ângulo do dono desse componente `mOwner->GetRotation`.

        2. Percorra os vértices desse componente `mVertices` multiplicando-os pela matriz de rotação com a função `Vector2::Transform`. Adicione o vetor transformado a uma coleção (e.g., `std::vector`) temporária de vertices.

        3. Utilize a função [[SDL_SetRenderDrawColor]](https://wiki.libsdl.org/SDL2/SDL_SetRenderDrawColor) para alterar a cor de desenho para branco.

        4. Chame a função `DrawPolygon` para desenhar o conjunto de vértices transformados.

        5. Utilize a função `DrawCircle` para desenhar o círculo de colisão desse objeto. Antes de desenhar, altere a cor para verde com a função [[SDL_SetRenderDrawColor]](https://wiki.libsdl.org/SDL2/SDL_SetRenderDrawColor). Esse trecho de código é útil para *debugar* a detecção de colisão.

### **Parte 3: Objetos do Asteroids**

Na terceira parte, você irá utilizar os novos componentes para implementar uma nave que atira raios laser e gerar um dado número de asteroides com geometrias aleatórias.

- **Game.cpp**

    1. **Inicialize a classe `Random` para gerar números aleatórios**

        1. Uma biblioteca `Random.h` foi incluída nesse projeto para a geração de números aleatórios. Utilize a função `Random::Init` para inicializar o gerador de números aleatórios.

    2. **Instancie a nave e os asteroides**

        1. Instancie um objeto da classe `Ship` com `20` pixels de altura e armazene seu ponteiro em `mShip`. Em seguida, posicione a nave `mShip->SetPosition` no meio da tela. Lembre-se que as variáveis `mWindowWidth` e `mWindowHeight` armazenam as dimensões da tela.

        2. Escreva um laço para instanciar `10` objetos da classe `Asteroid`, cada um com `80` pixels de raio.

    3.  **Implemente os métodos `AddAsteroid` e `RemoveAsteroid` para gerenciar a criação e remoção de asteroides**

        1. No método `AddAsteroid`, adicione (`emplace_back`) o asteroide `ast` ao vetor de asteroides `mAsteroids`.

        2. No método `RemoveAsteroid`, utilize a função `std::find` para procurar pelo asteroide `ast` no vetor de
        asteroides `mAsteroids`. Se o encontrar, remova-o do vetor de asteroides `mAsteroids.erase`.

- **Ship.cpp**

    1. **Implemente o construtor de `Ship` criando um triângulo para representar a nave visualmente e instanciando seus componentes**

        1. Crie 3 vértices (`Vector2`) considerando o centro da nave como origem e o atributo `mHeight` como altura do triângulo. 
        Por exemplo: `v1 = (-h,h/2)`, `v2 = (h, 0)` e `v3 = (-h/2)`

        2. Adicione esses 3 vértices em um contêiner `std::vector`.

        3. Instancie os componentes `DrawComponent`, `RigidBodyComponent` e `CircleColliderComponent`. Armazene seus ponteiros em `mDrawComponent`, `mRigidBodyComponent` e `mCircleColliderComponent` respectivamente. O contêiner de vértices criado na etapa anterior será passado como parâmetro para o `DrawComponente`. E, para o `CircleColliderComponent`, passe a metade da altura da nave como raio de colisão.

    2. **Ler os eventos do teclado para controlar a nave**

        1. Verifique se o jogador está pressionando a tecla `W` e, se estiver, aplique uma força para frente com magnitude dada pelo atributo `mForwardSpeed`. Utilize o método `GetForward` para obter o vetor da frente e a função `ApplyForce` do componente `mRigidBodyComponent`
        para aplicar a força.

        2. Inicialize uma variável local chamada `angularSpeed` com `0.0` e verifique se o jogador está pressionando a tecla `A`. 
        Se estiver, some a essa variável a velocidade de rotação `mRotationForce`.

        3. Verifique se o jogador está pressionando a tecla `D`. Se estiver, subtraia da velocidade angular `angularSpeed` a 
        velocidade de rotação `mRotationForce`.

        4. Verifique se o jogador está pressionando a `barra de espaço` e se o tempo de resfriamento do laser já terminou `mLaserCooldown <= 0f`. Se ambas as condições forem verdadeiras:

            1. Instancie uma nova partícula de laser com `5.0` pixels de comprimento;

            2. Posicione essa partícula na ponta da frente da nave (posição da nave `+` vetor forward `*` altura do triângulo da nave);

            3. Inicialize a rotação dessa partícula com o ângulo da nave. Basta utilizar os métodos `SetRotation` do laser e `GetRotation` da nave;

            4. Aplique uma força para frente nessa partícula com magnitude `3000.0`;

            5. Reinicialize o tempo de resfriamento do laser em um quarto de segundo (`0.25`).

        5. Altere a velocidade angular com o novo valor calculado `angularSpeed`. Utilize a função `SetAngularSpeed`.

    3. **Implemente o método `OnUpdate` para atualizar a nave a cada quadro**

        1. Subtraia `deltaTime` do tempo de resfriamento do laser `mLaserCooldown`

        2. Calcule a força de resistência do ar para parar lentamente a nave. Lembre-se de que essa força é um vetor 
        `f_r = -v.norm() * ||v||^2 * c_r`, onde `v` é o vetor velocidade `velocity` e `c_r` é o coeficiente de resistência `mFrictionCoefficient`. Armazene a força calculada em um vetor chamado `dragForce`.

        3. Aplique a força `drag` na nave com a função `ApplyForce` do `mRigidBodyComponent`

        4. Percorra a lista de asteroides do jogo e verifique para cada asteroide se ele está colidindo com a nave. O
        método `GetGame()->GetAsteroids` retorna a lista de asteroides. Além disso, você já implementou o método `Intersect` do `CircleColliderComponent`. Tanto a nave quanto os asteroides possuem esse componente, então basta utilizar essa função para 
        verificar a colisão. Se houver colisão da nave com algum asteroide, termine o jogo (`GetGame()->Quit`).

- **Asteroid.cpp**

    1. **Implemente o construtor `Asteroid` gerando um círculo com ruídos para representar o asteroide visualmente e instanciando seus componentes**

        1. Utilize a função `Random::GetVector` para gerar uma posição aleatória inicial para o asteroide. Garanta que essa posição inicial não resultará em uma colisão com a configuração inicial da nave. Utilize a função `SetPosition` para alterar a posição inicial do asteroide com a posição gerada.

        2. Instancie os componentes `DrawComponent`, `RigidBodyComponent` e `CircleColliderComponent`. Armazene seus ponteiros em `mDrawComponent`, `mRigidBodyComponent` e `mCircleColliderComponent` respectivamente. O contêiner de vértices criado na etapa anterior será passado como parâmetro para o `DrawComponente`. E, para o `CircleColliderComponent`, passe a média dos comprimentos dos vértices gerados `averageLength` como raio de colisão.

        3. Aplique a força aleatória gerada anteriormente `randStartingForce` para mover o asteroide. Utilize a função `ApplyForce` do componente `mRigidBodyComponent`.

        4. Adicione (`game->AddAsteroid`) esse asteroide, `this`, à lista de asteroides do jogo.

    2. **Implemente o destrutor `~Asteroid`**

        1. Remova (`game->RemoveAsteroid`) esse asteroide, `this`, da lista de asteroides do jogo.

    3. **Gere um conjunto de vértices em uma circunferência adicionando um pequeno ruído a cada um deles**

        1. Inicialize uma variável `angle` (float) com `zero`. Ela será utilizada para percorrer o arco de uma
         circunferência em intervalos angulares de tamanho fixo.

        2. Repita o seguinte procedimento para um dado número de vértices `numVertices`: 
            - Gere um número real entre `0.5` e `1.0` e multiplique-o pelo raio da circunferência (`radius`). Armazene o resultado em uma variável `randLength`;
            
            - Calcule a coordenada `x` do novo vértice multiplicando `randLength` pelo cosseno do ângulo corrente `angle`;
            
            - Calcule a coordenada `y` da mesma forma, porém multiplicando pelo seno do ângulo corrente;
            
            - Adicione o vetor `(x,y)` ao conjunto de vértices `vertices`;
            
            - Incremente o ângulo corrente por `2*PI` dividido pelo número de vértices `numVertices`.

- **Laser.cpp**

    1. **Implemente o construtor `Laser` gerando um segmento de reta para representar o asteroide visualmente e instanciando seus componentes**

        1. Crie `2` vértices (`Vector2`) considerando o centro da nave como origem e o atributo `mLength` como o comprimento do raio laser. Por exemplo: `v1 = (-l/2, 0)` e `v2 = (l/2, 0)`.

        2. Adicione esses `3` vértices em um contêiner `std::vector`.

        3. Instancie os componentes `DrawComponent`, `RigidBodyComponent` e `CircleColliderComponent`. Armazene seus ponteiros em `mDrawComponent`, `mRigidBodyComponent` e `mCircleColliderComponent` respectivamente. O contêiner de vértices criado na etapa anterior será passado como parâmetro para o `DrawComponente`. Para o `RigidBodyComponent`, passe uma massa pequena (e.g., `0.1`) como parâmetro.  Para o `CircleColliderComponent`, passe o comprimento do raio lases `mLenght` como raio de colisão.

    2. **Implemente o método `OnUpdate` para atualizar o raio laser a cada quadro**

        1. O raio laser deve ser destruído depois de um tempo desde sua emissão ou quando houver colisão com um asteroide. Para contar quanto tempo percorreu desde a emissão do raio laser, subtraia `deltaTime` do cronômetro criado para essa contagem (`mDeathTimer`). Verifique se esse cronômetro é menor ou igual a zero. Se for, destrua o laser alterando seu estado `SetState` para `ActorState::Destroy`. Caso contrário, percorra a lista de asteroids `GetGame()->GetAsteroids` verificando se o laser colide com algum deles. Se houver colisão, destrua o laser e o asteroide alterando seus estados para `ActorState::Destroy`.

### **Parte 4: Customização**

Na quarta, e última etapa, você irá ajustar as variáveis do jogo para criar uma versão única do Asteroids.

1. Escolha um novo tamanho de universo (janela);

2. Defina um novo esquema de cores;

3. Altere o tamanho da nave e dos asteroides;

4. Ajuste os parâmetros de movimentação (velocidade, massa, coeficientes de resistência etc.) da nave e dos asteroides.

## Submissão

Para submeter o seu trabalho, basta fazer o *commit* e o *push* das suas alterações no repositório que foi criado para
você no GitHub classroom.

```
git add .
git commit -m 'Submissão P3'
git push
```

## Barema

- Parte 1: Movimentação de Objetos Rígidos (30%)
- Parte 2: Desenhos Vetoriais (30%)
- Parte 3: Objetos do Asteroids (30%)
- Parte 4: Customização (10%)

## Referências

- Parte 1: 
    - [Game Programming in C++, Cap 3, Vectors nad Basic Physics](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch03.xhtml)
