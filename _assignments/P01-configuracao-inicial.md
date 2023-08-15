---
type: assignment
date: 2023-08-18T08:00
title: 'P1: Configuração Inicial'
permalink: '/avaliacoes/p1-configuracao-inicial/'
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

Jogos digitais são projetos de software relativamente grandes e complexos. Sendo assim, em contextos profissionais, eles são tipicamente desenvolvidos de maneira estruturada em um ambiente de desenvolvimento integrado (IDE) com um sistema de controle de versão. 

## Objetivo

Nesse projeto você irá configurar o ambiente de desenvolvimento de jogos que será utilizado ao longo do curso. Primeiro você irá baixar e instalar a IDE CLion para programação e teste dos jogos. Em seguida, você irá criar um repositório GitHub para o controle de versão e submissão do seu trabalho. Além disso, como primeiro projeto do seu repositório, você irá escrever um pequeno programa em C++ usando a biblioteca SDL para desenhar um quadrado em uma janela. A figura a seguir ilustra o resultado esperado desse projeto:

<img src="{{'/_images/asg/p1/result2.png' | prepend: site.baseurl }}" alt="p1-configuracao-inicial" width="560"/>

## Inicialização

1. Se você não tiver uma conta no GitHub, crie uma seguindo o tutorial [**[nesse link]**](https://git-scm.com/book/pt-br/v2/GitHub-Configurando-uma-conta)
2. Se você não tiver o git instalado no seu computador, faça a instalação seguindo o tutorial [**[nesse link]**](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
3. Aceite o projeto `p1-configuracao-inicial` no GitHub classroom [**[nesse link]**](https://classroom.github.com/a/qhHAuinC)
4. Clone o seu novo repositório no seu computador:

    ```
    # Substitua <GITHUB_USERNAME> pelo seu usuário do GitHub
    git clone https://github.com/ufv-inf216/p1-configuracao-inicial-<GITHUB_USERNAME>.git
    ```

## Instruções

### **Parte 1: Instalação**

Na primeira parte, você irá baixar e instalar a IDE CLion e a biblioteca SDL.

1. **Instalar a IDE CLion**

    1. Acesse o site da CLion [**[nesse link]**](https://www.jetbrains.com/clion) e siga as instruções de instalação para o seu sistema operacional;

    2. Durante a instalação, crie uma conta utilizando o seu email da UFV, o que irá ativar uma licensa gratuita

2. **Instalar a bilioteca SDL**

    - **Linux**

        1. Acesse o site da versão 2.28.2 da SDL [**[nesse link]**](https://github.com/libsdl-org/SDL/releases/tag/release-2.28.2) e baixe o pacote `Source code.zip`

        2. Extraia o conteúdo do pacote no diretório temporário `/tmp/SDL2/`

        4. Instale a biblioteca no diretório `/opt/SDL2/`:
        
            ```
            cd /tmp/SDL2/
            ./configure --prefix /opt/SDL2/
            make all
            sudo make install
            ```

    - **Windows**

        1. Acesse o site da versão 2.28.2 da SDL [**[nesse link]**](https://github.com/libsdl-org/SDL/releases/tag/release-2.28.2) e baixe o pacote `SDL2-devel-2.28.2-mingw.zip`

        2. Extraia o conteúdo do pacote no diretório `C:\Arquivos de Programas\SDL2\`. Ao final dessa etapa, a SDL deve estar configurada dessa maneira:

            <img src="{{'/_images/asg/p1/parte1-win.png' | prepend: site.baseurl }}" alt="p1-parte1" width="560"/>

    - **Mac**
        1. Acesse o site da versão 2.28.2 da SDL [**[nesse link]**](https://github.com/libsdl-org/SDL/releases/tag/release-2.28.2) e baixe o pacote `SDL2-2.28.2.dmg`

        2. Clique na imagem para abrí-la e copie e o pacote `SDL2.framework` para o diretório `/Library/Frameworks/`. Ao final dessa etapa, a SDL deve estar configurada dessa maneira:

            <img src="{{'/_images/asg/p1/parte1-mac.png' | prepend: site.baseurl }}" alt="p1-parte1" width="560"/>

### **Parte 2: Um primeiro programa SDL**

Nessa etapa, você irá utilizar a IDE Clion para escrever um programa em C++/SDL que desenha um quadrado em uma janela.


- **main.cpp**

    1. **Escreva um programa em C++/SDL que desenha um quadrado em uma janela**

        1. Inicialize o subsistema de vídeo da SDL (`SDL_INIT_VIDEO`) com a função [`SDL_Init`](https://wiki.libsdl.org/SDL2/SDL_Init) e verifique se a inicialização ocorreu com sucesso. Se não, imprima uma mensagem de erro para o usuário com a função SDL_Log e retorne -1;

        2. Crie uma janela (escolha largura e altura) usando a função [`SDL_CreateWindow`](https://wiki.libsdl.org/SDL2/SDL_CreateWindow) e verifique se a criação ocorreu com     sucesso. Se não, imprima uma mensagem de erro para o usuário com a função SDL_Log e retorne -1;

        3. Crie um buffer de fundo usando a função [`SDL_CreateRenderer`](https://wiki.libsdl.org/SDL2/SDL_CreateRenderer). Utilize as flags `SDL_RENDERER_ACCELERATED` e `SDL_RENDERER_PRESENTVSYNC`. Verifique se a criação ocorreu com sucesso. Se não, imprima uma mensagem de erro para o usuário com a função SDL_Log e retorne -1;

        4. Utilize a função [`SDL_SetRenderDrawColor`](https://wiki.libsdl.org/SDL2/SDL_SetRenderDrawColor) para altere a cor de fundo (escolha a cor);

        5. Utilize a função [`SDL_RenderClear`](https://wiki.libsdl.org/SDL2/SDL_RenderClear) para limpar o buffer de fundo com a cor configurada anteriormente;

        6. Utilize a função [`SDL_SetRenderDrawColor`](https://wiki.libsdl.org/SDL2/SDL_SetRenderDrawColor) novamente para alterar a cor do quadrado (escolha a cor) que será desenhado;

        7. Crie um quadrado com a estrutura [`SDL_Rect`](https://wiki.libsdl.org/SDL2/SDL_Rect) e utilize a função [`SDL_RenderFillRect`](https://wiki.libsdl.org/SDL2/SDL_RenderFillRect) para desenhá-lo no buffer de fundo;
        
        8. Utilize a função [`SDL_RenderPresent`](https://wiki.libsdl.org/SDL2/SDL_RenderPresent) para trocar o buffer da frente com o buffer de fundo;

        9. Implemente um loop que processa eventos de entrada com a função [`SDL_PollEvent`](https://wiki.libsdl.org/SDL2/SDL_PollEvent), enquanto ela não retornar um evento do tipo `SDL_QUIT`;

        10. Quando o loop terminar, utilize as funções [`SDL_DestroyRenderer`](https://wiki.libsdl.org/SDL2/SDL_DestroyRenderer) e [`SDL_DestroyWindow`](https://wiki.libsdl.org/SDL2/SDL_DestroyWindow) para destruir a buffer de fundo e janela criados. Em seguida, utilize a função [`SDL_Quit`](https://wiki.libsdl.org/SDL2/SDL_Quit) para finalizar o subsistema de vídeo da SDl.

### **Parte 3: Customização**

Na terceira, e última etapa, você irá ajustar algumas das variáveis do programa.

1. Escolha um novo tamanho de janela;

2. Defina um novo esquema de cores que modifique as cores do fundo e do quadrado;

3. Escolha uma nova posição e um novo tamanho para o quadrado;

## Submissão

Para submeter o seu trabalho, basta fazer o commit e o push das suas alterações no repositório que foi criado para
você no GitHub classroom.

```
git add .
git commit -m 'Submissão P1'
git push
```

## Barema

- Parte 1: Instalação (0%)
- Parte 2: Um primeiro programa SDL (90%)
- Parte 3: Customização (10%)

## Referências

- Para o Git: [https://git-scm.com/book/pt-br/v2](https://git-scm.com/book/pt-br/v2)
- Instalação da SDL: [https://lazyfoo.net/tutorials/SDL/01_hello_SDL/index.php](https://lazyfoo.net/tutorials/SDL/01_hello_SDL/index.php)
