// ============================================
// CUARTO REY - LÓGICA DEL JUEGO
// ============================================

// ============================================
// CONFIGURACIÓN Y DATOS
// ============================================

// Modos disponibles
const MODES = {
    suave: 'suave',
    carrete: 'carrete'
};

// Estado global del juego
let gameState = {
    mode: MODES.suave,
    deck: [],
    drawnCards: [],
    lastThreeCards: [],
    currentCard: null,
    cardsLeft: 0,
    gameStarted: false,
    cardRevealed: false
};

// ============================================
// DEFINICIÓN DE REGLAS
// ============================================

// Estructura de reglas por valor de carta
const rulesDatabase = {
    // AS
    A: {
        title: {
            suave: 'Regala 2',
            carrete: 'Regala 2 Retos'
        },
        description: {
            suave: 'Elige a alguien para recibir 2 penalizaciones o retos cortos.',
            carrete: 'Elige a alguien que reciba 2 retos atrevidos. ¡Tú decides su destino!'
        },
        type: 'Penalización',
        color: 'required'
    },

    // DOS
    2: {
        red: {
            title: {
                suave: 'Historia',
                carrete: 'Historia Loca'
            },
            description: {
                suave: 'Comienza una historia con una frase. Cada jugador debe agregar una parte sin equivocarse.',
                carrete: 'Comienza una historia absurda. Cada jugador agrega una parte más ridícula que la anterior.'
            },
            type: 'Grupal'
        },
        black: {
            title: {
                suave: 'Categoría',
                carrete: 'Categoría Rápida'
            },
            description: {
                suave: 'Se elige una categoría. Cada jugador dice un elemento sin repetir ni demorarse.',
                carrete: 'Se elige una categoría. Deben nombrar elementos sin repetir. ¡Rápido o pierdes!'
            },
            type: 'Grupal'
        }
    },

    // TRES
    3: {
        red: {
            title: {
                suave: 'Reacción Rápida',
                carrete: 'Chancho Inflado'
            },
            description: {
                suave: 'Juego de coordinación. Siguen una secuencia de gestos. Quien falle recibe penalización.',
                carrete: 'Todos siguen gestos sin equivocarse. El que falla paga el pato.'
            },
            type: 'Físico'
        },
        black: {
            title: {
                suave: 'Dedito',
                carrete: 'Dedito de Fortuna'
            },
            description: {
                suave: 'Todos ponen un dedo sobre la mesa. Di un número. Si aciertas, te salvas.',
                carrete: 'Todos los dedos en la mesa. Acierta cuántos quedan o recibe penalización.'
            },
            type: 'Suerte'
        }
    },

    // CUATRO
    4: {
        red: {
            title: {
                suave: 'Cascada',
                carrete: 'Bongo Bong'
            },
            description: {
                suave: 'Todos siguen una acción en cadena sin parar. Quien rompe el ritmo pierde.',
                carrete: 'Ritmo grupal sin parar. Rompelo y recibirás tu penalización.'
            },
            type: 'Grupal'
        },
        black: {
            title: {
                suave: 'Nunca Nunca',
                carrete: 'Nunca Nunca'
            },
            description: {
                suave: 'Dices una frase tipo "Nunca nunca…". Quien lo haya hecho recibe penalización.',
                carrete: 'Di algo que nunca has hecho. Quienes lo hicieron... pagan las consecuencias.'
            },
            type: 'Social'
        }
    },

    // CINCO
    5: {
        red: {
            title: {
                suave: 'Animales Felices',
                carrete: 'Animales sin Dientes'
            },
            description: {
                suave: 'Dice un animal sin sonreír ni mostrar dientes. Quien se ría pierde.',
                carrete: 'Di un animal sin reír. El primero que sonría paga penitencia.'
            },
            type: 'Físico'
        },
        black: {
            title: {
                suave: 'Regla Especial',
                carrete: 'Nueva Regla'
            },
            description: {
                suave: 'Inventas una regla que todos deben cumplir hasta el final del juego.',
                carrete: 'Creas una regla nueva y todos la cumplen. ¡Que sea buena!'
            },
            type: 'Estrategia'
        }
    },

    // SEIS
    6: {
        red: {
            title: {
                suave: 'Espalda a Espalda',
                carrete: 'Espalda a Espalda'
            },
            description: {
                suave: 'Dos jugadores espalda a espalda. El grupo pregunta, ambos apuntan sin mirarse.',
                carrete: 'Dos contra el grupo. Deben sincronizarse sin verse. ¿Qué tan unidos están?'
            },
            type: 'Parejas'
        },
        black: {
            title: {
                suave: 'Votación',
                carrete: 'Coliseo'
            },
            description: {
                suave: 'Se hace una votación grupal. La minoría recibe penalización.',
                carrete: 'El grupo vota entre dos opciones. Los votos perdedores pagan.'
            },
            type: 'Grupal'
        }
    },

    // SIETE
    7: {
        red: {
            title: {
                suave: 'El Siete Mágico',
                carrete: 'El Siete'
            },
            description: {
                suave: 'Se cuenta en ronda. En 7 o múltiplos de 7, dices una palabra clave.',
                carrete: 'Cuentan en ronda. En 7 o múltiplos, di una palabra. ¡Rápido o pierdes!'
            },
            type: 'Atención'
        },
        black: {
            title: {
                suave: 'Solo Preguntas',
                carrete: 'Pregunta sin Respuesta'
            },
            description: {
                suave: 'Solo pueden hablar haciendo preguntas. Quien conteste normal pierde.',
                carrete: 'Todo se pregunta. Responder sin preguntar = penalización.'
            },
            type: 'Lingüístico'
        }
    },

    // OCHO
    8: {
        red: {
            title: {
                suave: 'Verdad o Penitencia',
                carrete: 'Verdad o Penitencia'
            },
            description: {
                suave: 'Elige entre responder una verdad o cumplir una penitencia breve del grupo.',
                carrete: 'Verdad incómoda o penitencia atrevida. Elige tu destino.'
            },
            type: 'Decisión'
        },
        black: {
            title: {
                suave: 'Voto Grupal',
                carrete: 'Repudio'
            },
            description: {
                suave: 'El grupo vota por alguien según una pregunta. El más votado recibe penalización.',
                carrete: 'Votación anónima. El más votado enfrenta las consecuencias.'
            },
            type: 'Grupal'
        }
    },

    // NUEVE
    9: {
        red: {
            title: {
                suave: 'Ándale Ándale',
                carrete: 'Contra Reloj'
            },
            description: {
                suave: 'Debes cumplir una acción rápida antes de que el grupo termine una cuenta regresiva.',
                carrete: 'Haz algo antes de que terminen la cuenta. ¡Rápido!'
            },
            type: 'Velocidad'
        },
        black: {
            title: {
                suave: 'Probabilidades',
                carrete: 'Probabilidades'
            },
            description: {
                suave: 'Un jugador desafía a otro con una probabilidad. Si coinciden en números, se salva.',
                carrete: 'Desafío de azar. Acierta el número o recibe penalización.'
            },
            type: 'Suerte'
        }
    },

    // DIEZ
    10: {
        red: {
            title: {
                suave: 'Apunta al Más...',
                carrete: 'Apunta al Más...'
            },
            description: {
                suave: 'Se lee una frase tipo "Apunta al más..." y todos señalan. El más apuntado pierde.',
                carrete: 'Leemos una pregunta. Todos apuntan a alguien. El más votado... sufre.'
            },
            type: 'Grupal'
        },
        black: {
            title: {
                suave: 'Mi ___ es...',
                carrete: 'Mi Secreto es...'
            },
            description: {
                suave: 'Completas una frase personal tipo "Mi ___ es…". El grupo vota si pasa o no.',
                carrete: 'Completa una frase personal. El grupo decide si es lo suficientemente buena.'
            },
            type: 'Personal'
        }
    },

    // JOTA
    J: {
        red: {
            title: {
                suave: 'Abecedario',
                carrete: 'Abecedario Loco'
            },
            description: {
                suave: 'Se elige una categoría. Cada jugador responde con la siguiente letra del abecedario.',
                carrete: 'Categoría elegida. Respondan en orden alfabético. ¡Rápido!'
            },
            type: 'Atención'
        },
        black: {
            title: {
                suave: 'Vikingo',
                carrete: 'Vikingo'
            },
            description: {
                suave: 'Un jugador es vikingo e inicia gestos laterales. Los demás los siguen.',
                carrete: 'Juego de gestos. Todos siguen al vikingo o reciben penalización.'
            },
            type: 'Físico'
        }
    },

    // REINA
    Q: {
        red: {
            title: {
                suave: 'Ojitos Mágicos',
                carrete: 'Ojitos'
            },
            description: {
                suave: 'Elige a alguien solo con la mirada. Si entienden, se salvan. Si no, penalización.',
                carrete: 'Comunícate con una mirada. Si te entienden, te salvas.'
            },
            type: 'Comunicación'
        },
        black: {
            title: {
                suave: 'Dato Freak',
                carrete: 'Dato Freak'
            },
            description: {
                suave: 'Cuenta un dato freak real sobre ti. El grupo decide si es verdad.',
                carrete: 'Cuenta un dato rarísimo sobre ti. ¿Alguien lo cree?'
            },
            type: 'Personal'
        }
    },

    // REY
    K: {
        title: {
            suave: 'Cuarto de Rey',
            carrete: 'Cuarto de Rey'
        },
        description: {
            suave: 'Se te hacen 3 preguntas. Debes responder o crear una mini historia con los temas.',
            carrete: 'Tres preguntas. Responde rápido o créate una historia épica.'
        },
        type: 'Especial',
        color: 'required',
        questions: [
            '¿Qué pasó?',
            '¿Cómo pasó?',
            '¿Dónde pasó?',
            '¿Con quién pasó?',
            '¿Por qué nadie lo esperaba?',
            '¿Qué salió mal?',
            '¿Cuál fue el final?',
            '¿Quién fue el culpable?',
            '¿Cuándo sucedió?'
        ]
    },

    // COMODÍN
    joker: {
        title: {
            suave: 'Todos Juntos',
            carrete: 'COMODÍN - TODOS'
        },
        description: {
            suave: 'Todos los jugadores reciben una penalización o reto grupal.',
            carrete: 'Todos al mismo tiempo. Nadie se escapa esta vez.'
        },
        type: 'Grupal',
        color: 'multicolor'
    }
};

// Mensajes especiales para Keys y Comodines
const specialMessages = {
    king: {
        suave: '¡Se reveló un Rey! ¡Cuarto de Rey activado!',
        carrete: '👑 EL REY HA LLEGADO 👑 Tu destino está en las preguntas...'
    },
    joker: {
        suave: '¡Comodín! ¡A TODOS les toca!',
        carrete: '🃏 CAOS TOTAL 🃏 ¡Nadie se escapa!'
    }
};

// ============================================
// FUNCIONES DE MAZO
// ============================================

/**
 * Crea un mazo completo de cartas de naipe inglés
 * @returns {Array} Array con todas las cartas
 */
function createDeck() {
    const suits = ['♥️', '♦️', '♠️', '♣️'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    // Crear cartas ordinarias
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({
                value: value,
                suit: suit,
                color: (suit === '♥️' || suit === '♦️') ? 'red' : 'black'
            });
        });
    });

    // Agregar comodines (ajustable)
    deck.push({ value: 'Joker', suit: '🃏', color: 'multicolor' });
    deck.push({ value: 'Joker', suit: '🃏', color: 'multicolor' });

    return deck;
}

/**
 * Mezcla un array usando algoritmo Fisher-Yates
 * @param {Array} array - Array a mezclar
 * @returns {Array} Array mezclado
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Inicializa un nuevo juego
 */
function initializeGame() {
    gameState.deck = shuffleArray(createDeck());
    gameState.drawnCards = [];
    gameState.lastThreeCards = [];
    gameState.currentCard = null;
    gameState.cardsLeft = gameState.deck.length;
    gameState.gameStarted = true;
    gameState.cardRevealed = false;
    updateCardCounter();
}

/**
 * Saca una carta del mazo
 * @returns {Object|null} Carta sacada o null si no hay cartas
 */
function drawCard() {
    if (gameState.deck.length === 0) {
        return null;
    }

    const card = gameState.deck.pop();
    gameState.drawnCards.push(card);
    gameState.currentCard = card;
    gameState.cardsLeft = gameState.deck.length;

    // Guardar en últimas 3 cartas
    gameState.lastThreeCards.unshift(card);
    if (gameState.lastThreeCards.length > 3) {
        gameState.lastThreeCards.pop();
    }

    updateCardCounter();
    return card;
}

// ============================================
// FUNCIONES DE REGLAS
// ============================================

/**
 * Obtiene la regla para una carta específica
 * @param {Object} card - Objeto de carta
 * @returns {Object} Objeto con title, description, type
 */
function getRuleForCard(card) {
    if (card.value === 'Joker') {
        return {
            title: rulesDatabase.joker.title[gameState.mode],
            description: rulesDatabase.joker.description[gameState.mode],
            type: rulesDatabase.joker.type,
            isJoker: true
        };
    }

    const ruleData = rulesDatabase[card.value];

    if (!ruleData) return null;

    // Si la regla requiere color
    if (ruleData.color === 'required') {
        return {
            title: ruleData.title[gameState.mode],
            description: ruleData.description[gameState.mode],
            type: ruleData.type,
            isKing: card.value === 'K'
        };
    }

    // Si tiene variantes por color
    if (ruleData[card.color]) {
        return {
            title: ruleData[card.color].title[gameState.mode],
            description: ruleData[card.color].description[gameState.mode],
            type: ruleData[card.color].type
        };
    }

    return null;
}

/**
 * Genera 3 preguntas aleatorias para el Cuarto de Rey
 * @returns {Array} Array con 3 preguntas
 */
function generateKingQuestions() {
    const questions = rulesDatabase.K.questions;
    const selected = [];

    while (selected.length < 3) {
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!selected.includes(random)) {
            selected.push(random);
        }
    }

    return selected;
}

// ============================================
// FUNCIONES DE UI - PANTALLAS
// ============================================

/**
 * Cambia a una pantalla específica
 * @param {string} screenId - ID de la pantalla
 */
function switchScreen(screenId) {
    // Remover clase active de todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Agregar clase active a la pantalla seleccionada
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

/**
 * Cambia el modo de juego
 * @param {string} mode - 'suave' o 'carrete'
 */
function setGameMode(mode) {
    gameState.mode = mode;

    // Actualizar botones visualmente
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
}

// ============================================
// FUNCIONES DE UI - RENDERIZADO
// ============================================

/**
 * Actualiza el contador de cartas
 */
function updateCardCounter() {
    const counter = document.getElementById('cards-left');
    if (counter) {
        counter.textContent = gameState.cardsLeft;
    }
}

/**
 * Renderiza la carta revelada
 * @param {Object} card - Objeto de carta
 */
function renderRevealedCard(card) {
    const revealedCard = document.getElementById('revealed-card');
    if (!revealedCard) return;

    const cardValue = revealedCard.querySelector('.card-value');
    const cardSuit = revealedCard.querySelector('.card-suit');

    cardValue.textContent = card.value;
    cardSuit.textContent = card.suit;

    // Determinar color
    if (card.color === 'red') {
        cardValue.style.color = '#ff4757';
        cardSuit.style.color = '#ff4757';
    } else if (card.color === 'black') {
        cardValue.style.color = '#2f3542';
        cardSuit.style.color = '#2f3542';
    } else {
        cardValue.style.color = '#c93ff7';
        cardSuit.style.color = '#ffa502';
    }

    // Agregar animación
    revealedCard.classList.remove('show');
    // Trigger reflow
    void revealedCard.offsetWidth;
    revealedCard.classList.add('show');

    // Efectos especiales
    if (card.value === 'K') {
        revealedCard.classList.add('card-glow');
    } else if (card.value === 'Joker') {
        revealedCard.classList.add('card-shake');
    }
}

/**
 * Renderiza la regla correspondiente
 * @param {Object} rule - Objeto de regla
 * @param {Object} card - Objeto de carta
 */
function renderRule(rule, card) {
    if (!rule) return;

    const titleEl = document.getElementById('rule-title');
    const descEl = document.getElementById('rule-description');
    const typeEl = document.getElementById('rule-type');

    titleEl.textContent = rule.title;
    descEl.textContent = rule.description;
    typeEl.textContent = rule.type;

    // Mostrar preguntas si es King
    if (rule.isKing) {
        const questions = generateKingQuestions();
        let questionsHTML = '<strong>Preguntas del Cuarto Rey:</strong><br>';
        questions.forEach((q, i) => {
            questionsHTML += `<span style="display: block; margin-top: 8px;">• ${q}</span>`;
        });
        descEl.innerHTML = questionsHTML;
    }

    // Mostrar mensaje especial
    if (rule.isKing) {
        showSpecialMessage(specialMessages.king[gameState.mode]);
    } else if (rule.isJoker) {
        showSpecialMessage(specialMessages.joker[gameState.mode]);
    }

    // Cambiar color del tipo según la regla
    if (rule.isJoker) {
        typeEl.style.borderColor = '#c93ff7';
        typeEl.style.color = '#c93ff7';
        typeEl.style.background = 'rgba(201, 63, 247, 0.2)';
    } else if (rule.isKing) {
        typeEl.style.borderColor = '#ffa502';
        typeEl.style.color = '#ffa502';
        typeEl.style.background = 'rgba(255, 165, 2, 0.2)';
    }
}

/**
 * Muestra un mensaje especial
 * @param {string} message - Mensaje a mostrar
 */
function showSpecialMessage(message) {
    // Crear elemento temporal
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 165, 2, 0.95);
        color: #fff;
        padding: 30px;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        text-align: center;
        animation: slideUp 0.5s ease-out;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    msgEl.textContent = message;
    document.body.appendChild(msgEl);

    // Remover después de 2 segundos
    setTimeout(() => {
        msgEl.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => msgEl.remove(), 500);
    }, 2000);
}

/**
 * Actualiza la lista de últimas cartas
 */
function updateLastCards() {
    const lastCardsList = document.getElementById('last-cards-list');
    if (!lastCardsList) return;

    lastCardsList.innerHTML = '';

    gameState.lastThreeCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'last-card-item';

        if (card.color === 'red') {
            cardEl.style.color = '#ff4757';
        } else if (card.color === 'black') {
            cardEl.style.color = '#2f3542';
        } else {
            cardEl.style.color = '#c93ff7';
        }

        cardEl.innerHTML = `
            <span>${card.value}</span>
            <span style="font-size: 14px;">${card.suit}</span>
        `;
        lastCardsList.appendChild(cardEl);
    });
}

/**
 * Renderiza la lista completa de reglas
 */
function renderRulesList() {
    const rulesList = document.getElementById('rules-list');
    if (!rulesList) return;

    rulesList.innerHTML = '';

    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    values.forEach(value => {
        const group = document.createElement('div');
        group.className = 'rule-group';

        const title = document.createElement('h3');
        title.className = 'rule-group-title';
        title.textContent = `${value}`;
        group.appendChild(title);

        const ruleData = rulesDatabase[value];

        if (ruleData && ruleData.color === 'required') {
            // No tiene variantes por color
            const item = document.createElement('div');
            item.className = 'rule-item';
            item.innerHTML = `
                <div class="rule-item-title">${ruleData.title.suave}</div>
                <div class="rule-item-description">${ruleData.description.suave}</div>
            `;
            group.appendChild(item);
        } else if (ruleData) {
            // Tiene variantes por color
            const redData = ruleData.red;
            const blackData = ruleData.black;

            if (redData) {
                const redItem = document.createElement('div');
                redItem.className = 'rule-item';
                redItem.style.borderLeftColor = '#ff4757';
                redItem.innerHTML = `
                    <div class="rule-item-title">${redData.title.suave} <span style="color: #ff4757;">♥️ ♦️</span></div>
                    <div class="rule-item-description">${redData.description.suave}</div>
                `;
                group.appendChild(redItem);
            }

            if (blackData) {
                const blackItem = document.createElement('div');
                blackItem.className = 'rule-item';
                blackItem.style.borderLeftColor = '#2f3542';
                blackItem.innerHTML = `
                    <div class="rule-item-title">${blackData.title.suave} <span style="color: #2f3542;">♠️ ♣️</span></div>
                    <div class="rule-item-description">${blackData.description.suave}</div>
                `;
                group.appendChild(blackItem);
            }
        }

        rulesList.appendChild(group);
    });

    // Agregar comodín
    const jokerGroup = document.createElement('div');
    jokerGroup.className = 'rule-group';
    const jokerTitle = document.createElement('h3');
    jokerTitle.className = 'rule-group-title';
    jokerTitle.style.color = '#c93ff7';
    jokerTitle.textContent = 'Comodín 🃏';
    jokerGroup.appendChild(jokerTitle);

    const jokerItem = document.createElement('div');
    jokerItem.className = 'rule-item';
    jokerItem.style.borderLeftColor = '#c93ff7';
    jokerItem.innerHTML = `
        <div class="rule-item-title">${rulesDatabase.joker.title.suave}</div>
        <div class="rule-item-description">${rulesDatabase.joker.description.suave}</div>
    `;
    jokerGroup.appendChild(jokerItem);
    rulesList.appendChild(jokerGroup);
}

// ============================================
// LÓGICA DE JUEGO - EVENTOS
// ============================================

/**
 * Maneja el toque del mazo
 */
function handleDeckTap() {
    if (!gameState.gameStarted) return;
    if (gameState.cardsLeft === 0) {
        showEndScreen();
        return;
    }

    const card = drawCard();

    if (card) {
        renderRevealedCard(card);
        const rule = getRuleForCard(card);
        renderRule(rule, card);
        updateLastCards();

        gameState.cardRevealed = true;

        // Habilitar botón siguiente
        const nextBtn = document.getElementById('btn-next-card');
        if (nextBtn) nextBtn.disabled = false;
    }
}

/**
 * Maneja el botón siguiente carta
 */
function handleNextCard() {
    // Ocultar carta revelada
    const revealedCard = document.getElementById('revealed-card');
    if (revealedCard) {
        revealedCard.classList.remove('show');
    }

    gameState.cardRevealed = false;

    // Deshabilitar botón
    const nextBtn = document.getElementById('btn-next-card');
    if (nextBtn) nextBtn.disabled = true;

    // Mostrar mensaje si no hay más cartas
    if (gameState.cardsLeft === 0) {
        setTimeout(() => {
            showEndScreen();
        }, 300);
    }
}

/**
 * Reinicia el juego
 */
function resetGame() {
    initializeGame();
    renderRulesList();

    // Resetear UI
    const revealedCard = document.getElementById('revealed-card');
    if (revealedCard) {
        revealedCard.classList.remove('show');
    }

    const nextBtn = document.getElementById('btn-next-card');
    if (nextBtn) nextBtn.disabled = true;

    updateLastCards();

    // Volver a pantalla de juego
    switchScreen('screen-game');
}

/**
 * Muestra la pantalla final
 */
function showEndScreen() {
    const mode = gameState.mode;
    const messages = {
        suave: '¡Lo hicieron! El mazo fue conquistado. Todos sobrevivieron... esta vez.',
        carrete: '¡Épico! ¡El Cuarto Rey está orgulloso de sus guerreros!'
    };

    const msgEl = document.getElementById('end-message');
    if (msgEl) {
        msgEl.textContent = messages[mode];
    }

    switchScreen('screen-end');
}

// ============================================
// INICIALIZACIÓN - EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ========== PANTALLA DE INICIO ==========
    
    // Iniciar juego al tocar en la pantalla de inicio
    const screenStart = document.getElementById('screen-start');
    if (screenStart) {
        screenStart.addEventListener('click', function() {
            if (!gameState.gameStarted) {
                initializeGame();
                renderRulesList();
                switchScreen('screen-game');
                // Revelar automáticamente la primera carta
                setTimeout(() => {
                    handleDeckTap();
                }, 300);
            }
        });
    }

    // ========== PANTALLA DE JUEGO ==========

    // Toque del mazo
    document.getElementById('card-deck').addEventListener('click', handleDeckTap);

    // Botón siguiente carta
    document.getElementById('btn-next-card').addEventListener('click', handleNextCard);

    // Botón ver reglas (desde juego)
    document.getElementById('btn-rules-game').addEventListener('click', function() {
        renderRulesList();
        switchScreen('screen-rules');
    });

    // Botón reiniciar
    document.getElementById('btn-restart').addEventListener('click', function() {
        if (confirm('¿Reiniciar el juego?')) {
            resetGame();
        }
    });

    // ========== PANTALLA DE REGLAS ==========

    // Botón volver (desde reglas)
    document.getElementById('btn-back-from-rules').addEventListener('click', function() {
        if (gameState.gameStarted) {
            switchScreen('screen-game');
        } else {
            switchScreen('screen-start');
        }
    });

    // ========== PANTALLA FINAL ==========

    // Botón jugar otra vez
    document.getElementById('btn-play-again').addEventListener('click', function() {
        resetGame();
    });

    // ========== INTERACTIVIDAD MOBILE ==========

    // Permitir tap en móvil
    const deck = document.getElementById('card-deck');
    if (deck) {
        deck.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        deck.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    }

    console.log('✅ Cuarto Rey inicializado correctamente');
});
