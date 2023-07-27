---
type: assignment
date: 2023-08-18T08:00
title: 'P1: Configuração Inicial'
hide_from_announcments: true
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
due_event: 
    type: due
    date: 2023-08-25T07:30:00+2:00
    description: 'Entrega P1: Configuração Inicial'
---

## Objetivo

Nesse projeto você irá configurar o seu ambiente de desenvolvimento de jogos, incluindo uma IDE para programação e teste, um repositótio git para controle de versão e uma página web para publicação do seu portfólio pessoal.

## Introdução

<!-- No contexto da indústria de jogos digitais, um portfólio é uma coleção organizada de projetos relacionados à criação de jogos. É uma ferramenta essencial para os profissionais dessa área, incluindo programadores, artistas, designers, compositores, entre outros, que desejam mostrar suas habilidades, experiências e realizações aos potenciais empregadores, clientes ou parceiros.

O portfólio permite que os criadores de jogos demonstrem suas capacidades, estilo artístico, conhecimento técnico e criatividade. Ele pode conter uma variedade de materiais, dependendo da especialização do indivíduo e do seu envolvimento em diferentes aspectos do desenvolvimento de jogos. Como essa é uma disciplina de Ciência da Computação, o seu portfólio deverá destavar suas habilidades como programador. Sendo assim, os principais materiais do seu porfólio serão trechos de códigos associados a imagens ou vídeos do jogo e comentários que evidenciem suas princiais contribuições para aquele projeto.

Nesse projeto, você irá usar o GitHub para hospedar um repositório git que será usado durante a disciplina para o controle de versão dos seus projetos, bem como a página web do seu portfolio. -->

Jogos digitais são projetos de software relativamente grandes e complexos. Sendo assim, é extremamente importante que eles sejam desenvolvidos de maneira estruturada. Nesse projeto, você irá configurar o seu ambiente de projeto e desenvolvimento de jogos com um ambiente de desenvolvimento integrado (IDE) e um repositório para controle de versão. Nesse curso, utilizaremos a IDE CLion como ambiente de programação e o GitHub para controle de versão. Nesse primeiro projeto, você irá configurar esses ambientes para que os seus próximos projetos sejam conduzidos de maneira organizada, rápida e segura. Além disso, como primeiro projeto do seu repositório, você irá escrever um pequeno programa em C++ usando a biblioteca SDL para desenhar um quadrado em uma janela.

## Instruções

### **1. Fazer o download e instalar a CLion**

<!-- A CLion é uma IDE profissional multiplataforma desenvolvida e mantida pela empresa tcheca JetBrains. Apesar de ser uma IDE prorietária e paga, a JetBrains oferece licensas gratuitas para alunos e professores. Para fazer o download e instalar a CLion, você pode seguir as seguintes instruções: -->

1. Acesse o site da CLion e clique no botão de download ([https://www.jetbrains.com/clion](https://www.jetbrains.com/clion));
2. Execute o instalador baixado no seu sistema operacional;
3. Durante a instalação, crie uma conta utilizando o seu email da UFV, o que irá ativar uma licensa gratuita.

### **2. Fazer o download e configurar a biblioteca SDL na CLion**

<!-- A SDL é uma biblioteca que facilita o acesso multiplataforma a dispositivos de áudio, controle, gráficos, entre outros. Ela é utilizada profissionalmente para o desenvolvivento de jogos, tocadores de vídeo, emuladores, etc. A SDL não é uma game engine, pois não fornece funcionalidades específicas de jogos, como simulações físicas ou inteligência artificial. Nessa disciplina, iremos utilzar a SDL para implementar tais funcionalidades e criar a nossa prória engine. Para fazer o download e configurar a SDL na CLion, você pode seguir as seguintes instruções: -->

1. Acesse o site da SDL, clique no botão *SDL Releases* e escolhar a última versão da SDL para o seu sistema operacional ([https://www.libsdl.org](https://www.libsdl.org/index.php));
3. Salve os arquivos de cabeçalho (*.h) e os binários da biblioteca em um diretório que você tem permissão de leitura;
4. Utilizando a CLion, crie um novo projeto C++11 chamado `inf216-projeto01`;
5. Adicione as seguintes linhas ao arquivo `CMakeLists.txt` para incluir os cabeçalhos e linkar o binário da biblioteca:

    ```
    set(SDL2_LIB "<LIB_PATH>")
    target_include_directories(inf216_projeto01 PRIVATE "<HEADERS_DIR_PATH>")
    target_link_libraries(inf216_projeto01 ${SDL2_LIB})
    ```

    Onde `<LIB_PATH>` deve ser substituido pelo caminho do binário da bilioteca e `<SDL2_LIB>` deve ser substituido
    pelo caminho do diretório de cabeçalhos da biblioteca.

### **3. Criar um repositório privado no GitHub para fazer o controle de versão dos seus projetos**

1. Se você não tiver uma conta no GitHub, acesse o site e crie uma ([https://github.com](https://github.com/));
2. 

### **4. Escrever um programa C++/SDL que desenha um quadrado em uma janela**

Modifique a função `main()` do arquivo `main.cpp` da seguinte forma:

1. Inicialize o subsistema de vídeo da SDL (`SDL_INIT_VIDEO`) com a função [`SDL_Init`](https://wiki.libsdl.org/SDL2/SDL_PollEvent)
2. Crie uma janela (escolha largura e altura) usando a função [`SDL_CreateWindow`](https://wiki.libsdl.org/SDL2/SDL_CreateWindow)
3. Crie um ponteiro para a superfície da janela com a função [`SDL_GetWindowSurface`](https://wiki.libsdl.org/SDL2/SDL_GetWindowSurface)
4. Altere a cor de fundo (escolha a cor) da janela usando a função [`SDL_FillRect`](https://wiki.libsdl.org/SDL2/SDL_FillRect)
5. Desenhe um quadrado (escolha o tamanho e cor) no centro da janela usando a função [`SDL_FillRect`](https://wiki.libsdl.org/SDL2/SDL_FillRect) e a estrutura [`SDL_Rect`](https://wiki.libsdl.org/SDL2/SDL_Rect)
6. Atualize o estado da janela com a função [`SDL_UpdateWindowSurface`](https://wiki.libsdl.org/SDL2/SDL_UpdateWindowSurface)
7. Implemente um loop que processa eventos de entrada com a função [`SDL_PollEvent`](https://wiki.libsdl.org/SDL2/SDL_PollEvent), enquanto ela não retornar um evento do tipo `SDL_QUIT`.
8. Quando o loop terminar, utilize as funções [`SDL_DestroyWindow`](https://wiki.libsdl.org/SDL2/SDL_DestroyWindow) para destruir a janela, seguida de [`SDL_Quit`](https://wiki.libsdl.org/SDL2/SDL_Quit) para 
finalizar o subsistema de vídeo aberto.
9. Fazer o commit e o pull do seu código no repositório.

### **5. Criar uma página web para o seu portfólio usando GitHub Pages**

## Submissão

Submer a URL do seu repositório via PVANet.

## Referências



