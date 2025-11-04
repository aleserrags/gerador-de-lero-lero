
let dados = null;

async function carregarDados() {
    try {
        const response = await fetch('./data/frases.json');
        dados = await response.json();
        console.log('Dados carregados com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar os dados. Por favor, recarregue a página.');
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function adicionarBuzzwords(texto, intensidade) {
    const quantidade = {
        light: 1,
        medium: 2,
        heavy: 3,
        extreme: 5
    }[intensidade] || 2;

    const templates = [
        (bw) => ` O conceito de ${bw} é fundamental neste processo.`,
        (bw) => ` Através de ${bw}, alcançamos resultados excepcionais.`,
        (bw) => ` A implementação de ${bw} revoluciona a abordagem tradicional.`,
        (bw) => ` O ${bw} representa um diferencial competitivo essencial.`,
        (bw) => ` Leveraging ${bw}, maximizamos o valor entregue.`,
        (bw) => ` A integração com ${bw} potencializa os outcomes esperados.`,
        (bw) => ` O uso estratégico de ${bw} acelera a transformação organizacional.`,
        (bw) => ` Mediante ${bw}, estabelecemos vantagens competitivas duradouras.`,
        (bw) => ` A adoção de ${bw} demonstra maturidade e visão de futuro.`,
        (bw) => ` Com ${bw} como pilar, construímos soluções de classe mundial.`,
        (bw) => ` A aplicação de ${bw} gera impacto mensurável e sustentável.`,
        (bw) => ` O ${bw} tornou-se essencial para a competitividade do setor.`,
        (bw) => ` Investimentos em ${bw} mostram ROI consistente e expressivo.`,
        (bw) => ` A estratégia de ${bw} diferencia líderes de seguidores.`,
        (bw) => ` Dominar ${bw} é imperativo no cenário atual.`
    ];

    for (let i = 0; i < quantidade; i++) {
        const buzzword = getRandomElement(dados.buzzwords);
        const template = getRandomElement(templates);
        texto += template(buzzword);
    }

    return texto;
}

function gerarFrase() {
    const tipo = Math.random();
    
    // 70% de chance de gerar frase padrão
    if (tipo < 0.7) {
        const inicio = getRandomElement(dados.inicios);
        const conectivo = getRandomElement(dados.conectivos);
        const objeto = getRandomElement(dados.objetos);
        const verbo = getRandomElement(dados.verbos);
        const resultado = getRandomElement(dados.resultados);
        const complemento = getRandomElement(dados.complementos);
        
        return `${inicio} ${conectivo} ${objeto} ${verbo} ${resultado} ${complemento}`;
    } 
    // 20% de chance de gerar frase simplificada
    else if (tipo < 0.9) {
        const inicio = getRandomElement(dados.inicios);
        const verbo = getRandomElement(dados.verbos);
        const resultado = getRandomElement(dados.resultados);
        
        return `${inicio} ${verbo} ${resultado}`;
    }
    // 10% de chance de gerar frase de impacto
    else {
        return getRandomElement(dados.frasesImpacto);
    }
}

function gerarLero() {
    if (!dados) {
        alert('Os dados ainda estão sendo carregados. Por favor, aguarde...');
        return;
    }

    const tamanho = document.getElementById('tamanho').value;
    const intensidade = document.getElementById('intensidade').value;
    const resultado = document.getElementById('resultado');
    const copyBtn = document.getElementById('copyBtn');
    
    resultado.innerHTML = '<div class="placeholder generating">Gerando lero-lero épico... 🤔</div>';
    resultado.classList.remove('has-content');
    copyBtn.disabled = true;

    setTimeout(() => {
        const quantidadeFrases = {
            curto: 2,
            medio: 4,
            longo: 6,
            mega: 8
        }[tamanho] || 4;

        let texto = '';
        
        for (let i = 0; i < quantidadeFrases; i++) {

            if (i > 0 && Math.random() > 0.5) {
                texto += getRandomElement(dados.transicoes) + ' ';
            }
            
            texto += gerarFrase() + '. ';
            
            if (intensidade !== 'light' && Math.random() > 0.7) {
                texto += getRandomElement(dados.frasesImpacto) + ' ';
            }
        }

        texto += ' ' + getRandomElement(dados.finalizadores);

        texto = adicionarBuzzwords(texto, intensidade);

        resultado.innerHTML = `<div class="lero-text">${texto}</div>`;
        resultado.classList.add('has-content');
        copyBtn.disabled = false;
    }, 1000);
}

function copiarTexto() {
    const texto = document.querySelector('.lero-text');
    if (texto) {
        navigator.clipboard.writeText(texto.textContent).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copiado!';
            copyBtn.style.background = '#28a745';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#28a745';
            }, 2000);
        });
    }
}

window.addEventListener('load', async () => {
    await carregarDados();
    setTimeout(gerarLero, 500);
});
