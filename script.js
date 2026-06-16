
// Aguarda todo o HTML da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    inicializarAbas();
    criarBotaoAcessibilidade();
});

/**
 * Gerencia a interatividade das abas (Produção, Equilíbrio, Tecnologia)
 */
function inicializarAbas() {
    const botoes = document.querySelectorAll(".botao-aba");
    const conteudos = document.querySelectorAll(".conteudo-aba");

    botoes.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            const abaAlvo = evento.currentTarget.getAttribute("onclick").match(/'([^']+)'/)[1];
           
            // 1. Remove a classe 'ativo' de todas as abas e botões
            conteudos.forEach(conteudo => conteudo.classList.remove("ativo"));
            botoes.forEach(b => b.classList.remove("ativo"));

            // 2. Mostra a aba clicada e destaca o botão
            const abaAtiva = document.getElementById(abaAlvo);
            if (abaAtiva) {
                abaAtiva.classList.add("ativo");
            }
            evento.currentTarget.classList.add("ativo");
        });

        // Remove o atributo antigo do HTML para usar o listener moderno do JS
        botao.removeAttribute("onclick");
    });
}

/**
 * Cria uma função extra de acessibilidade para quem tem dificuldades visuais,
 * permitindo aumentar o contraste e o conforto das fontes sem perder a paleta suave.
 */
function criarBotaoAcessibilidade() {
    // Cria o botão dinamicamente no rodapé da página
    const footer = document.querySelector("footer");
    if (!footer) return;

    const botaoFoco = document.createElement("button");
    botaoFoco.innerText = "✨ Modo Leitura Confortável";
   
    // Estilização minimalista para o botão de acessibilidade
    Object.assign(botaoFoco.style, {
        background: "var(--cor-detalhe)",
        color: "#ffffff",
        border: "none",
        padding: "8px 15px",
        borderRadius: "20px",
        marginTop: "15px",
        cursor: "pointer",
        fontSize: "0.85rem",
        transition: "transform 0.2s ease"
    });

    footer.appendChild(botaoFoco);

    // Evento de clique para ativar/desativar o modo leitura no card de texto
    botaoFoco.addEventListener("click", () => {
        const card = document.querySelector(".conteiner-interativo");
        if (card) {
            // Alterna o peso da fonte e o fundo para leitura melhorada
            if (card.style.fontSize === "1.15rem") {
                card.style.fontSize = "1rem";
                card.style.fontWeight = "normal";
                botaoFoco.innerText = "✨ Modo Leitura Confortável";
            } else {
                card.style.fontSize = "1.15rem";
                card.style.fontWeight = "500";
                botaoFoco.innerText = "✓ Modo Normal";
            }
        }
    });
}
