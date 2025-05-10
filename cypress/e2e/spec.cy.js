const clickButtons = (buttons) => {
  buttons.forEach(btn => {
    cy.contains('button', btn).click();
  });
};

describe('Testes da Calculadora', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // ajuste a URL se necessário
  });

  it('Exibição inicial', () => {
    cy.get('.display').should('have.text', '0');
  });

  it('Digitação de múltiplos dígitos', () => {
    clickButtons(['1', '2', '3']);
    cy.get('.display').should('have.text', '123');
  });

  it('Ignorar zeros à esquerda', () => {
    clickButtons(['0', '0', '5']);
    cy.get('.display').should('have.text', '5');
  });

  it('Inserção de ponto decimal', () => {
    clickButtons(['.', '5', '6']);
    cy.get('.display').should('have.text', '0.56');
  });

  it('Bloqueio de múltiplos pontos decimais', () => {
    clickButtons(['1', '.', '2', '.', '3']);
    cy.get('.display').should('have.text', '1.23');
  });

  it('Adição simples (5 + 3 = 8)', () => {
    clickButtons(['5', '+', '3', '=']);
    cy.get('.display').should('have.text', '8');
  });

  it('Subtração simples (9 – 4 = 5)', () => {
    clickButtons(['9', '–', '4', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Multiplicação simples (6 × 7 = 42)', () => {
    clickButtons(['6', '×', '7', '=']);
    cy.get('.display').should('have.text', '42');
  });

  it('Divisão simples (8 ÷ 2 = 4)', () => {
    clickButtons(['8', '÷', '2', '=']);
    cy.get('.display').should('have.text', '4');
  });

  it('Divisão por zero (5 ÷ 0 = Infinity)', () => {
    clickButtons(['5', '÷', '0', '=']);
    cy.get('.display').should('have.text', 'Infinity');
  });

  it('Operação sequencial (2 + 3 × 4 = 14)', () => {
    clickButtons(['2', '+', '3', '×', '4', '=']);
    cy.get('.display').should('have.text', '14');
  });

  it('Limpar display (AC)', () => {
    clickButtons(['1', '2', '3', 'AC']);
    cy.get('.display').should('have.text', '0');
  });

  it('Operação após resultado (5 + 3 = 8 → + 2 = 10)', () => {
    clickButtons(['5', '+', '3', '=', '+', '2', '=']);
    cy.get('.display').should('have.text', '10');
  });

  it('Troca de operador (5 + × 3 = 15)', () => {
    clickButtons(['5', '+', '×', '3', '=']);
    cy.get('.display').should('have.text', '15');
  });

  it('Números negativos (5 – 7 = -2)', () => {
    clickButtons(['5', '–', '7', '=']);
    cy.get('.display').should('have.text', '-2');
  });

  it('Máximo de dígitos no display (15 dígitos)', () => {
    clickButtons(Array(16).fill('1'));
    cy.get('.display').invoke('text').should('have.length.lte', 15);
  });

  it('Operação sem segundo número (5 + =)', () => {
    clickButtons(['5', '+', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Pressionar = sem operação (5 =)', () => {
    clickButtons(['5', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Operação com decimal (0.5 × 2 = 1)', () => {
    clickButtons(['.', '5', '×', '2', '=']);
    cy.get('.display').should('have.text', '1');
  });

  it('Reset após erro (5 ÷ 0 = Infinity → AC)', () => {
    clickButtons(['5', '÷', '0', '=', 'AC']);
    cy.get('.display').should('have.text', '0');
  });
});