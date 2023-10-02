---
type: assignment
date: 2023-09-22T08:00
title: 'P4: Super Mario Bros'
permalink: /p4-smb/
hide_from_announcments: false
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
due_event: 
    type: due
    date: 2023-10-13T23:59
    description: 'Entrega P4: Super Mario Bros'
---

## Introdução

O Super Mario Bros (SMB), lançado pela Nintendo em 1985, foi um dos jogos mais populares da era dos consoles 8 bits. 
SMB é um jogo de plataforma de rolagem lateral onde o objetivo do jogador é se mover para a direita para chegar a um 
mastro de bandeira no final de cada nível. O jogador controla o Mario, protagonista da série. O irmão de Mario, Luigi, é controlado pelo segundo jogador no modo multijogador e assume o mesmo papel e funcionalidade de Mario. Na narrativa do jogo, o mundo
é chamado de Reino do Cogumelo e o Mario está atravessando-o para salvar a Princesa Peach do antagonista Bowser. 
O video a seguir mostra um *gameplay* do jogo original:

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/7qirrV8w5SQ?si=uaXtyaT-f2IL-16m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Objetivo

O objetivo desse projeto é praticar a implementação de detecção de colisão com AABBs, rolagem de câmera, animação 2D e integração com editores externos. Para isso, você irá implementar as mecânicas básicas de correr, pular, e acertar inimigos no primeiro nível  do SMB. Primeiro, você irá implementar o componente `DrawSpriteComponent` para desenhar sprites estáticos (i.e., não-animados) na tela. Como parte dessa tarefa, você irá escrever uma função para ler níveis de arquivos texto. Depois, você irá implementar o componente `AABBCollideComponent` para detectar colisões entre caixas delimitadoras alinhadas com os eixos (AABBs). Em seguida, você irá implementar a rolagem de câmera e o componente `DrawAnimatedComponent`, de animações de sprites, utilizando sprite sheets gerados por uma ferramente externa. Por fim, você irá implementar os goombas, incluindo as mecâmicas de matá-los quando o jogador pula em cima deles e de matar o jogador quando eles o acertam no chão. O vídeo a seguir mostra um gameplay da versão que você irá implementar (apesar do vídeo conter áudio, nesse projeto você não irá implementar essa funcionalidade):

<div class="embed-youtube">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3P5yegKvOjY?si=_3uvfXxdJxi0Mjbp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Inicialização

Aceite o projeto *p4-super-mario-bros* no GitHub classroom [[nesse link]](https://classroom.github.com/a/y2VeqftW) e clone o seu novo repositório no seu computador:

```
# Substitua <GITHUB_USERNAME> pelo seu usuário do GitHub
git clone https://github.com/ufv-inf216/p4-super-mario-bros-<GITHUB_USERNAME>.git
```

## Código Base

Abra o projeto *p4-super-mario-bros* na CLion e, antes de começar a sua implementação, verique com cuidado as definições de métodos e atributos de cada classe. O código base desse projeto foi construído a partir do código do projeto anterior [[P3: Asteroids]](https://ufv-inf216.lucasnferreira.com/p3-asteroids/), portanto muitas das classes já foram introduzidas anteriormente. As novas classes desse projeto são:

- **DrawSpriteComponent**

    Componente para desenho de sprites estáticos (i.e., não animados). 

- **DrawAnimatedComponent**

    Componente para desenho de sprites animados (estende `DrawSpriteComponent`). 

- **AABBCollideComponent**

    Componente para detecção de colisão entre AABBs. 
    
- **Block**

    Classe que estende `Actor` para representar um bloco do jogo.

- **Goomba**

    Classe que estende `Actor` para representar o Goomba, inimigo que se movimenta horizontalmente de um lado para o outro.    

- **Mario**

    Classe que estende `Actor` para representar o Mário, que é controlado pelo jogador.   

- **Spawner**

    Classe que estende `Actor` para representar um "gatilho" (ou *trigger*) que cria um goomba quando o jogador está próximo.   

## Instruções

### **Parte 1: Sprites Estáticos**

Na primeira parte, você irá implementar o componente `DrawSpriteComponent` para desenhar sprites estáticos na tela.

- **Game.cpp**

    1. **Implemente o método `LoadTexture` para carregar uma textura com a SDL**

        1. Utilize a função `IMG_Load` para carregar a imagem passada como parâmetro `texturePath`. Esse função retorna um ponteiro para `SDL_Surface*`. Retorne `nullptr` se a imagem não foi carregada com sucesso.

        2. Utilize a função `SDL_CreateTextureFromSurface` para criar uma textura a partir da imagem carregada anteriormente. 
        Essa função retorna um ponteiro para `SDL_Texture*`. Logo após criar a textura, utilize a função `SDL_FreeSurface` para liberar a imagem carregada. Se a textura foi carregada com sucesso, retorne o ponteiro para a textura. Caso contrário, retorne `nullptr`.

    2. **Implemente o método `InitializeActors` para inicializar os objetos do jogo**

        1. Crie um objeto do tipo `Mario` e armazene-o na variável membro`mMario`.

        2. Utilize a função `LoadLevel` (que será implementa a seguir) para carregar o primeiro nível (Level1.txt) do jogo. 
        Esse arquivo tem 14 linhas e 213 colunas.

    3.  **Implemente o método `LoadLevel` para carregar um nível do jogo**

        1. Leia o arquivo texto `levelPath` com `height` linhas e `width` colunas para carregar um nível do jogo. Uma nível é representado por um grid com largura `width` e altura `height`, onde cada célula tem tamanho `32x32`. Para cara caractere entre `A` e `I`, crie um objeto do tipo `Block` utilizando a textura correspondente. Para cara caractere `Y`, crie um objeto do tipo `Spawner` utilizando a distância SPAWN_DISTANCE como parâmetro de criação.

- **DrawSpriteComponent.cpp**

    1. **Implemente o construtor e o método `Draw` para desenhar sprites estáticos**

        1. No construtor, utilize a função `LoadTexture` que você implementou na última etapa para criar uma textura a partir da imagem `texturePath` passada como parâmetro no construtor. Armazene o ponteiro retornado `SDLTexture*` na variável membro `mSpriteSheetSurface`.

        2. No método `Draw`, utilize a função `SDL_RenderCopyEx` para desenhar a textura armazenada na variável membro `mSpriteSheetSurface`. Você terá que criar um `SDL_Rect` para definir a região da tela onde será desenhado o sprite. Além disso, você terá que criar uma flag do tipo `SDL_RendererFlip` para definir se o sprite será desenhado virado à direita ou à esquerda. A orientação do sprite (esquerda ou direita) depende da rotação do objeto dono do sprite. Se a rotação for zero, o sprite deve ser desenhado virado à direita. Se for igual a `Math::Pi`, deve ser desenhado à esquerda.

- **Block.cpp**

    1. **Implemente o construtor para adicionar os componentes `AABBColliderComponent` e `DrawSpriteComponent`**

        1. Crie o `AABBColliderComponent` com dimensões `(0,0,32,32)` e tipo de colisão `ColliderLayer::Blocks`.

        2. Crie o `DrawSpriteComponent` com textura `texturePath` (passada com parâmetro) e dimensões `(32,32)`.

- **Mario.cpp**

    1. **Adicione os componentes `DrawSpriteComponent` e `RigidBodyComponent` no construtor**
        
        1. Até que você termine a implementação do componente de animação `DrawAnimatedComponent`, utilize o componente para desenho de sprites estáticos `DrawSpriteComponent`. Crie um desses componentes com a textura `Assets/Sprites/Mario/Idle.png` e dimensões `(32,32)`. 
        
        2. Para que o jogador possa se mover, crie também um componente `RigidBodyComponent` com massa `1.0` e coeficiente de atrito `5.0`. Note que a classe `Mario` já tem atributos para armazenar esses componentes.

    2. **Implemente o método `OnProcessInput` para mover o jogador horizontalmente**

        1.  Verifique se o jogador pressionou a tecla `D`. Se sim, aplique uma força para a direita com magnitude `mForwardSpeed` e altere a rotação `mRotation` para `0`. Além disso, altere a variável `mIsRunning` para verdadeiro. Isso será importante
        para controlar as animações na Parte 4.

        2.  Verifique se o jogador pressionou a tecla `A`. Se sim, aplique uma força para a esquerda com magnitude `mForwardSpeed` e altere a rotação `mRotation` para `Math::Pi`. Além disso, altere a variável `mIsRunning` para verdadeiro. Caso o jogador não estiver pressionando nem `D`, nem `A`, altere essa variável para falso. Isso será importante para controlar as animações na Parte 4.

Ao final dessa parte, você deveria ser capaz de se mover no nível 1 sem colisão, sem animação e sem movimento de câmera.

### **Parte 2: Detecção de Colisão com AABBs**

Na segunda parte, você irá implementar o componente `AABBColliderComponent` para detectar colisões no jogo.

- **AABBColliderComponent.cpp**

    1. **Implemente os métodos `GetMin`, `GetMax` e `GetCenter` para calcular os pontos de mínimo, máximo e centro da AABB, respectivamente**

        1. No método `GetMin`, calcule (e retorne) o ponto mínimo dessa AABB. A variável `mOffset`
        define a posição da AABB com relação a posição do objeto dono do componente. Portanto, 
        basta somar a posição do objeto dono do componente a esse deslocamento.

        2. No método `GetMax`, calcule (e retorne) o ponto máximo dessa AABB. As variáveis membro
        `mWidth` e `mHeight` definem a altura e a largura da AABB, respectivamente. Portanto,
         basta somar a largura à coordenada x e a altura à coordenada y do ponto mínimo da AABB 
         (utilize o método `GetMin` implementado anteriormente).

        3. No método `GetCenter`, calcule (e retorne) o centro dessa AABB. Esse ponto pode ser calculado
        de forma similar ao ponto máximo, basta somar a metade da largura à coordenada x e a metade da altura 
        à coordenada y do ponto mínimo da AABB (utilize o método `GetMin` implementado anteriormente).

    2. **Implemente método `Intersect` para verificar se duas AABBs têm interseção**

        1. Verifique se esta AABB está colidindo com a AABB `b` passada como parâmetro. Retorne verdadeiro se estiver e falso caso contrário. Utilize os métodos `GetMin` e `GetMax` para acessar os pontos de mínimo e máximo das duas AABBs.

    3. **Implemente método `GetMinOverlap` para calcular a sobreposição e lado de uma colisão**

        1.  Armazene no mapa `overlaps` as sobreposições (com sinal -/+) dos quatro lados da colisão: esquerda, direita, cima e baixo. Utilize os métodos `GetMin` e `GetMax` para acessar os pontos de mínimo e máximo das duas AABBs.

        2. Encontre e retorne a sobreposição com distância mínima. Para isso, utilize os valores absolutos das sobreposições calculadas na etapa anterior.

    4. **Implemente método `ResolveCollisions` para separar uma AABB após uma colisão**    

        1. Verifique se a sobreposição `minOverlap` ocorreu no lado de cima `CollisionSide::Top` com velocidade vertical negativa ou no lado de baixo `CollisionSide::Down` com velocidade vertical positiva. Note que a estrutura `minOverlap` já possui o lado onde ocorreu a colisão `minOverlap.side`. Se um desses dois casos for verdadeiro, some a quantidade de sobreposição `minOverlap.amount` à posição vertical do dono dessa AABB e reinicialize sua velocidade vertical para zero. Dica: para verificar, por exemplo, se a colisão foi por cima, basta comparar se `minOverlap.side` é igual a `CollisionSide::Top`.

        2. Caso nenhum dos dois casos anteriores sejam verdadeiros, verifique se a sobreposição `minOverlap` ocorreu no lado esquerdo `CollisionSide::Left` com velocidade horizontal negativa ou no lado direito `CollisionSide::Right` com velocidade horizontal positiva. Se um desses dois casos for verdadeiro, some a quantidade de sobreposição `minOverlap.amount` à posição horizontal do dono dessa AABB e reinicialize sua velocidade horizontal para zero.

    5. **Implemente método `DetectCollision` para detectar colisões entre os objetos do jogo**

        1. Utilize a função `std::sort` para ordenar o vetor `colliders` de acordo com a distância entre o centro 
        dessa AABB e o centro de cada AABB desse vetor. O vetor `colliders` contém as AABBs de todos os atores do jogo (Mário, goombas e blocos). Ordenar esse vetor dessa forma fará com que as colisões mais próximas sejam resolvidas primeiro, zerando as velocidades dos objetos na ordem esperada.

        2.  Utilize um laço para percorra o vetor `colliders` ordenado, verificando colisões com cada AABB alvo. 
        Em cada iteração do laço, execute as seguintes operações:
            1. Verifique se o elemento corrente é a AABB desse objeto `this`. Se for, continue para a próximo elemento, pois não precisamos verificar colisão de uma AABB com ela mesma. 
          
            2. Verifique se o elemento corrente está habilitado `IsEnabled()`. Se não estiver, continue para a próximo elemento, pois não queremos verificar colisão de uma AABB desabilitada.
          
            3. Utilize a função `GetMinOverlap` para obter a sobreposição mínima dessa AABB com o elemento corrente. Em seguida, utilize a função `ResolveCollisions` para resolver a colisão entre essa AABB e o elemento corrente. Por fim, armazene os dados dessa sobreposição no mapa `responses`. Essa mapa será utilizado para enviar uma mensagem de callback `OnCollision` para o objeto dono dessa AABB.
          
            4. Verifique se já houve uma colisão vertical e uma horizontal durante o laço. Se sim, interrompa o laço (break), pois não precisamos verificar mais colisões.

- **Mario.cpp**

    1. **Adicione o componente `AABBColliderComponent` para habilitar colisões do jogador com os blocos do nível**
        
        1. Crie um componente `AABBColliderComponent` no construtor da classe `Mario` com dimensões `(0,0,32,32)` e o tipo `ColliderLayer::Player` da AABB. Se quiser desenhar a AABB do Mário para testas as colisões, crie um componente `DrawPolygonComponent` com os vértices da AABB.

    2. **Modifique o método `OnProcessInput` para implementar o pulo**

        1. Verifique se o jogador está no chão (`mIsOnGround`) e se ele pressionou a tecla `A`. Se sim, altere a velocidade vertical para `mJumpSpeed` e a variável `mIsOnGround` para falso. Utilize `SetVelocity` ao invés de `ApplyForce` para que o pulo seja mais rápido e preciso.

Ao final dessa parte, você deveria ser capaz de se mover no nível 1 com colisão, porém sem animação nem movimento de câmera.

### **Parte 3: Rolagem de Câmera**

Na terceira parte, você irá implementar a rolagem de câmera desenhando os objetos em relação à posição da câmera, ao invés da
origem do mundo.

- **Game.cpp**

    1. **Implemente o método `UpdateCamera` para fazer a câmera seguir o jogador**

        1. Calcule a posição horizontal da câmera subtraindo a posição horizontal do jogador (i.e., do Mário) da metade da largura da janela. Isso fará com que a câmera fique sempre centralizada no jogador. No SMB, o jogador não pode voltar no nível, portanto, antes de atualizar a posição da câmera, verifique se a posição calculada é maior do que a posição anterior. Além disso, limite a posição para que a câmera fique entre 0 e o limite superior do nível. Para calcular o limite superior do nível, utilize as constantes `LEVEL_WIDTH` e `TILE_SIZE`.

- **DrawSpriteComponent.cpp**

    1. **Modifique o método `Draw` para subtrair a posição da câmera da posição do objeto**

        1. Para que o objeto seja desenhado em relação a posição da câmera, subtraia a posição da câmera da posição do objeto quando for desenhá-lo com a função `SDL_RenderCopyEx`.

- **Mario.cpp**

    1. **Modifique o método `OnUpdate` para garantir que a posição horizontal do jogador esteja sempre à frente da câmera**

        1. Para evitar que o jogador ultrapasse o limite inferior (esquerdo) da câmera, limite sua posição horizontal para ser sempre maior ou igual a posição horizontal da câmera.

### **Parte 4: Animações**

Na quarta parte, você irá implementar o componente `DrawAnimatedSprite` para animar os objetos do jogo. No entanto, antes de
começar a escrever o código, você precisará utilizar o [TexturePacker](https://www.codeandweb.com/texturepacker) para gerar os sprite sheets do Mário, Goomba e dos blocos. Utilize o formato de dados `json (Array)` e o algoritmo `Grid/Strip` para 
exportar os sprite sheets. Copie os sprite sheets (imagens e dados) para os seus respectivos locais dentro do diretório `Assets` do projeto. Por exemplo, copie o sprite sheet do Mário para o local `Assets/Sprites/Mario`.

- **DrawAnimatedComponent.cpp**

    Todos os quadros de um objeto estão armazenados no vetor `mSpriteSheetData`. Cada posição desse vetor é um ponteiro para um `SDL_Rect*`, representando as coordenadas de um sprite no sprite sheet. Além disso, todas as animações estão armazenadas no mapa `mAnimations`. Uma animação é identificada por um nome (string) e definida por um vetor de índices de quadros (armazenados em `mSpriteSheetData`). A nome da animação corrente é armazenado na variável membro `mAnimName`. 

    1. **Implemente o método `Update` para atualizar o timer da animação**

        1. Verifique se animação está pausada (`mIsPaused`). Se estiver, saia da função (return).

        2. Atualize o timer da animação `mAnimTimer` com base na taxa de atualização (`mAnimFPS`) e no delta time

        3. Podemos converter o timer da animação `mAnimTimer`para inteiro para obter o índice do quadro atual. No entanto, temos que garantir que esse índice não será maior do que número total de quadros da animação corrente (`mAnimations[mAnimName].size()`). Verifique se o timer da animação é maior ou igual ao número de quadros da animação corrente. Se for, utilize um laço `while` para decrementar o timer por esse mesmo número até essa condição seja falsa.

    2. **Implemente o método `Draw` para desenhar o sprite corrente da animação**
        
        Sempre que um objeto com o componente `DrawAnimatedComponent` é desenhado na tela, precisamos obter o índice do quadro corrente a partir do timer da animação. Para isso, basta converter o timer da animação (`mAnimTimer`) para inteiro.

        1.  Obtenha o índice do quadro corrente indexando o mapa `mAnimations` com o timer da animação (`mAnimTimer`) convertido para inteiro. Note que `mAnimations[mAnimName]` armazena os índices dos quadros da animação atual. Armazene o resultado em uma variável `spriteIdx`.

        2. Utilize a função `SDL_RenderCopyEx` para desenhar o sprite com índice `spriteIdx`. O SDLRect que define a região do sprite no sprite sheet está armazenado em `mSpriteSheetData[spriteIdx]`. Além disso, você terá que criar um SDL_Rect para definir a região da tela onde será desenhado o sprite, assim como no `DrawSpriteComponent`. Não se esqueça de subtrair a posição da câmera da posição do objeto. Você também terá que criar uma flag do tipo SDL_RendererFlip assim como no DrawSpriteComponent.

    3. **Implemente o método `SetAnimation` para mudar a animação corrente**

        1. Salve o nome da animação corrente `name` na variável membro `mAnimName` e  chame a função Update passando delta 
        time igual a zero para reinicializar o timer da animação `mAnimTimer`.

- **Mario.cpp**

    1. **Modifique o construtor para adionar o componente de desenho `DrawAnimatedComponent` ao invés de `DrawSpriteComponent`**

        1. Crie um componente `DrawAnimatedComponent` passando os caminhos da imagem (.png) e dos dados (.json) do sprite sheet do Mário que você criou com o TexturePacker.

        2. Utilize a função `AddAnimation` para adicionar as animações "dead", "idle", "jump" e "run".

        3. Utilize a função `SetAnimation` para definir a animação inicial como "idle". Em seguida, utilize a função `SetAnimFPS` para definir a taxa de atualização de quadros da animação para 10.0f.

    2. **Modifique o método `OnUpdate` para detectar quando o jogador morreu**

        1. Verifique se a posição vertical do jogador é maior do que o tamanho da tela. Se for, chame o método `Kill`.

    3. **Implemente o método `Kill` para tocar a animação de morte e finalizar o jogo**

        1. Altere a animação para "dead" e o valor da variável `mIsDead` para verdadeiro. Além disso, desabilite (`SetEnabled(false)`) os componentes `mRigidBodyComponent` e `mColliderComponent`.

    4. **Implemente o método `OnCollision` para atualizar o estado do jogador após uma colisão**

        O mapa `responses` contém os dados de cada colisão desse objeto nesse quadro. Cada elemento 
        de  `responses` é uma estrutura do tipo `Overlap`, que contém o lado da colisão `side`, o tamanho da sobreposição `amount` (com sinal -/+) e um ponteiro `target` para a AABB que colidiu com o objeto. 

        1. Percorra essa mapa atualizando o estado do jogador bom base no tipo de colisão: 

            1. Se a colisão ocorreu com um objeto do tipo `ColliderLayer::Blocks` pelo lado de baixo `CollisionSide::Down`,
                significa que o jogador aterrizou no chão. Nesse caso, altere o valor da variável `mIsOnGround` para verdadeiro.

            2. Se a colisão ocorreu com um objeto do tipo `CollisionSide::Enemy` pelo lado de baixo, significa que o jogador
                acertou um goomba no ar. Nesse caso, mate esse goomba e altere a velocidade do jogador para dar um "meio pulo" (`mJumpSpeed/1.5f`). Utilize o ponteiro `target` do elemento corrente para acessar o ponteiro para esse goomba e o método `Kill` do goomba para matá-lo  `target->GetOwner()->Kill()`.

            3. Se a colisão ocorreu com um objeto do tipo `CollisionSide::Enemy` pelo lado direito ou esquerdo e o jogador está no chão, significa que o goomba acertou o jogador. Nesse caso, utilize a função `Kill` para matar o jogador.

            4. Se a colisão ocorreu com um objeto do tipo `CollisionSide::Enemy` pelo lado direito ou esquerdo e o jogador não está no chão, também significa que o jogador acertou um goomba no ar. Nesse caso, mate o goomba como no caso 2. 

    5. **Implemente a método `ManageAnimations` para selecionar a animação correta com base no estado do jogador**

        1. Para implementar a troca de animação, basta utilizar os atributos `mIsDead` para verificar se o jogador está morto,
        `mIsOnGround` se o jogador está no chão e `mIsRunning` se o jogador está correndo. 

            1. Se ele estiver morto, altere a animação para `idle`

            2. Se estiver vivo, no chão e correndo, altere a animação para `run`

            3. Se estiver vivo, no chão e não estiver correndo,  altere a animação para `idle`

            4. Se estiver vivo e não estiver no chão, altere a animação para `jump`

### **Parte 5: Inimigos**

Na quinta parte, você irá implementar os goombas e os spawners, que criam goombas quando o jogador está próximo.

- **Goomba.cpp**

    1. **Crie os componentes `RigidBodyComponent`, `AABBColliderComponent`, e `DrawAnimatedComponent` no construtor**

        1. Crie o `RigidBodyComponent` com massa `1.0f` e coeficiente de atrito `0.0` (basta omitir esse parâmetro para inicializa-lo com zero). Altere a velocidade horizontal do goomba para `mForwardSpeed`.

        2. Crie o `AABBColliderComponent` com dimensões `(0,0,32,32)` e tipo de colisão `ColliderLayer::Enemy`.

        3. Crie o componente `DrawAnimatedComponent` passando os caminhos da imagem (.png) e dos dados (.json) do sprite sheet do goomba que você criou com o TexturePacker. 
        
            1. Utilize a função `AddAnimation` para adicionar as animações "walk" e "dead".

            2. Utilize a função `SetAnimation` para definir a animação inicial como "walk". Em seguida, utilize a função `SetAnimFPS` para definir a taxa de atualização de quadros da animação para 5.0f.

    2. **Implemente o método `Kill` para tocar a animação de morte e desabilitar os componentes**

        1. Altere a animação para "dead" e o valor da variável `mIsDying` para verdadeiro. Além disso, desabilite 
        `SetEnabled(false)` os componentes `mRigidBodyComponent` e  `mColliderComponent`

    3. **Implemente o método `OnUpdate` para destruir os goombas que já morreram**

        1. Verifique se a variável `mDyingTimer` é verdadeira. Se for, decremente o cronômetro `mDyingTimer` pelo delta time.
        Quando esse cronômetro chegar a zero, altere o estado do goomba para `ActorState::Destroy`

        2. Verifique se a posição vertical do goomba é maior do que o tamanho da tela. Se for, altere o estado do goomba para `ActorState::Destroy`

    4. **Implemente o método `OnCollision` para alterar a direção do goomba quando ele colidir horizontalmente**

        1. Percorra o mapa de colisões `responses` atualizando o estado do jogador bom base no tipo de colisão ocorrida. 
        Se a colisão foi à esquerda, altere a velocidade horizontal para `mForwardSpeed`. Se foi à direita, altera a 
        velocidade horizontal para `-mForwardSpeed`.

- **Spawner.cpp**

    1. **Implemente o método `OnUpdate` para criar um goomba quando o jogador estiver próximo**

        1. Verifique se a distância horizontal entre o jogador (`GetGame()->GetMario()`) e esse objeto spawner é menor do que `mSpawnDistance`. Se for, crie um novo goomba com velocidade `GOOMBA_FORWARD_SPEED`. Altere a posição do goomba para ser igual a posição desse spawner. Em seguida, altere a velocidade do goomba para que ele se mova para a esquerda com velocidade `GOOMBA_FORWARD_SPEED`. Por fim, destrua esse objeto spawner.

### **Parte 6: Customização**

Na sexta, e última etapa, você irá ajustar as variáveis do jogo para criar uma versão única do Super Mário Bros.

1. Altere os parâmetros de movimentação (velocidade, massa, coeficientes de atrito, etc.) do jogador para encontrar uma jogabilidade
que mais lhe agrada.

2. Altere o nível dado ou crie um completamente novo.

- **Extras:**

1. Toque a animação de "stomp" quando o jogador pula em cima do goomba.

2. Implemente a lógica para mover os blocos para cima quando o jogador os acerta por baixo. Blocos com um ponto de interrogação
   podem ser configurados para dar uma moeda ou não (os cogumelos estão fora de escopo pois adicionam uma complexidade maior). 

3. Ao invés de carregar níveis de arquivos texto, integre o seu jogo com o editor de níveis [[Tiled]](https://www.mapeditor.org/).

## Submissão

Para submeter o seu trabalho, basta fazer o *commit* e o *push* das suas alterações no repositório que foi criado para
você no GitHub classroom.

```
git add .
git commit -m 'Submissão P4'
git push
```

## Barema

- Parte 1: Sprites Estáticos (15%)
- Parte 2: Detecção de Colisão com AABBs (30%)
- Parte 3: Rolagem de Câmera (15%)
- Parte 4: Animações (25%)
- Parte 5: Inimigos (10%)
- Parte 6: Customização (5%)

## Referências

- Parte 1: 
    - [Game Programming in C++, Cap 3, Vectors nad Basic Physics](https://learning.oreilly.com/library/view/game-programming-in/9780134598185/ch03.xhtml)