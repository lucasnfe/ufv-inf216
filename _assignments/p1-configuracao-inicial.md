---
type: assignment
date: 2023-08-18T08:00
title: 'P1: Configuração Inicial'
permalink: '/p1-configuracao-inicial/'
hide_from_announcments: true
# pdf: /static_files/assignments/asg.pdf
# attachment: /static_files/assignments/asg.zip
# solutions: /static_files/assignments/asg_solutions.pdf
github: https://classroom.github.com/a/qhHAuinC
due_event: 
    type: due
    date: 2023-08-25T07:30:00+2:00
    description: 'Entrega P1: Configuração Inicial'
---

## Introdução

Jogos digitais são projetos de software relativamente grandes e complexos. Sendo assim, em contextos profissionais, eles são tipicamente desenvolvidos de maneira estruturada em um ambiente de desenvolvimento integrado (IDE) com um sistema de controle de versão. Além disso, ao final desses projetos, profissionais da área de jogos costumam organizá-los em um portfólio, que são utilizados para demonstrar suas habilidades técnicas e criativas a potenciais empregadores, clientes ou parceiros.

## Objetivo

Nesse projeto você irá configurar o ambiente de desenvolvimento de jogos que será utilizado ao longo do curso. Primeiro você irá baixar e instalar a IDE CLion para programação e teste dos jogos. Em seguida, você irá criar um repositótio GitHub para o controle de versão do código desenvolvido e hospedagem de uma página web para publicação do seu portfólio pessoal. Além disso, como primeiro projeto do seu repositório, você irá escrever um pequeno programa em C++ usando a biblioteca SDL para desenhar um quadrado em uma janela.

<!-- No contexto da indústria de jogos digitais, um portfólio é uma coleção organizada de projetos relacionados à criação de jogos. É uma ferramenta essencial para os profissionais dessa área, incluindo programadores, artistas, designers, compositores, entre outros, que desejam mostrar suas habilidades, experiências e realizações aos potenciais empregadores, clientes ou parceiros.

O portfólio permite que os criadores de jogos demonstrem suas capacidades, estilo artístico, conhecimento técnico e criatividade. Ele pode conter uma variedade de materiais, dependendo da especialização do indivíduo e do seu envolvimento em diferentes aspectos do desenvolvimento de jogos. Como essa é uma disciplina de Ciência da Computação, o seu portfólio deverá destavar suas habilidades como programador. Sendo assim, os principais materiais do seu porfólio serão trechos de códigos associados a imagens ou vídeos do jogo e comentários que evidenciem suas princiais contribuições para aquele projeto.

Nesse projeto, você irá usar o GitHub para hospedar um repositório git que será usado durante a disciplina para o controle de versão dos seus projetos, bem como a página web do seu portfolio. -->

## Instruções

### **1. Aceitar o projeto P1 no GitHub Classroom**

1. Se você não tiver uma conta no GitHub, acesse o site e crie uma: [https://github.com](https://github.com/);
2. Aceite o projeto `p1-configuracao-inicial` no GitHub classroom: [https://classroom.github.com/a/qhHAuinC](https://classroom.github.com/a/qhHAuinC);
3. Clone o seu novo repositório com o comando [`git clone <url>`](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository), substituindo `<url>` pela URL do repositório.

### **2. Instalar a IDE CLion e a biblioteca SDL**

1. Acesse o site da CLion ([https://www.jetbrains.com/clion](https://www.jetbrains.com/clion)): 
    1. Clique no botão de download;
    2. Execute o instalador baixado e, durante a instalação, crie uma conta utilizando o seu email da UFV, o que irá ativar uma licensa gratuita.
2. Acesse o site da SDL ([https://www.libsdl.org](https://www.libsdl.org/index.php)): 
    1. Clique no botão de releases e escolha a versão para o seu sistema operacional;
    2. Salve os arquivos de cabeçalho (*.h) e os binários da SDL em um diretório que você tem permissão de leitura;

### **3. Escrever um programa em C++ com SDL que desenha um quadrado em uma janela**

#### **CMakeLists.txt**

1. Edite a linha 11, alterando `<SDL_PATH>` para o caminho do binário da SDL no seu computador;
2. Edite a linha 14, alterando `<SDL_HEADERS_PATH>` para o caminho do diretório com os arquivos de cabeçalho (*.h) da SDL.

#### **main.cpp**

1. Inicialize o subsistema de vídeo da SDL (`SDL_INIT_VIDEO`) com a função [`SDL_Init`](https://wiki.libsdl.org/SDL2/SDL_PollEvent)
2. Crie uma janela (escolha largura e altura) usando a função [`SDL_CreateWindow`](https://wiki.libsdl.org/SDL2/SDL_CreateWindow)
3. Crie um ponteiro para a superfície da janela com a função [`SDL_GetWindowSurface`](https://wiki.libsdl.org/SDL2/SDL_GetWindowSurface)
4. Altere a cor de fundo (escolha a cor) da janela usando a função [`SDL_FillRect`](https://wiki.libsdl.org/SDL2/SDL_FillRect)
5. Desenhe um quadrado (escolha o tamanho e cor) no centro da janela usando a função [`SDL_FillRect`](https://wiki.libsdl.org/SDL2/SDL_FillRect) e a estrutura [`SDL_Rect`](https://wiki.libsdl.org/SDL2/SDL_Rect)
6. Atualize o estado da janela com a função [`SDL_UpdateWindowSurface`](https://wiki.libsdl.org/SDL2/SDL_UpdateWindowSurface)
7. Implemente um loop que processa eventos de entrada com a função [`SDL_PollEvent`](https://wiki.libsdl.org/SDL2/SDL_PollEvent), enquanto ela não retornar um evento do tipo `SDL_QUIT`.
8. Quando o loop terminar, utilize as funções [`SDL_DestroyWindow`](https://wiki.libsdl.org/SDL2/SDL_DestroyWindow) para destruir a janela, seguida de [`SDL_Quit`](https://wiki.libsdl.org/SDL2/SDL_Quit) para 
finalizar o subsistema de vídeo aberto.
9. Fazer commit e pull do seu código no repositório.

## Submissão

Para submeter o seu trabalho, basta fazer o commit e o push das suas alterações no repositório que foi criado para
você no GitHub classroom.

## Referências



