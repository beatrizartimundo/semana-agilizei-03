/// <reference types="cypress"/>

import {format, prepareLocalStorage} from '../support/utils'


context('Dev finances Agilizei', () => {

    beforeEach(()=>{
        cy.visit('https://devfinance-agilizei.netlify.app/',{
            onBeforeLoad:(win)=>{
                prepareLocalStorage(win)
            }
        })
        
        // cy.get('#data-table tbody tr').should('have.length',0)
    })
    it('validar entradas', () => {

        cy.get('#transaction > .button').click()
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#description').clear();
        cy.get('#description').type('mesada');
        cy.get('#amount').clear();
        cy.get('#amount').type('20.00');
        cy.get('#date').clear();
        cy.get('#date').type('2021-03-17');
        cy.get('button').click();
        /* ==== End Cypress Studio ==== */
        cy.get('#data-table tbody tr').should('have.length',3)
    });
    it('validar saida', () => {

        cy.get('#transaction > .button').click()
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#description').clear();
        cy.get('#description').type('comida');
        cy.get('#amount').clear();
        cy.get('#amount').type('-50.00');
        cy.get('#date').clear();
        cy.get('#date').type('2021-03-17');
        cy.get('button').click();
        /* ==== End Cypress Studio ==== */
        cy.get('#data-table tbody tr').should('have.length',3)
    });


it('remover entradas e saidas', () => {

    const entrada = "mesada"
    const saida = "comida"

    cy.get('#transaction > .button').click()
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#description').clear();
    cy.get('#description').type(entrada);
    cy.get('#amount').clear();
    cy.get('#amount').type('100.00');
    cy.get('#date').clear();
    cy.get('#date').type('2021-03-17');
    cy.get('button').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#transaction > .button').click()
    cy.get('#description').clear();
    cy.get('#description').type(saida);
    cy.get('#amount').clear();
    cy.get('#amount').type('-50.00');
    cy.get('#date').clear();
    cy.get('#date').type('2021-03-17');
    cy.get('button').click();
    /* ==== End Cypress Studio ==== */

    // estrategia 1 sem xpath
    cy.get('td.description')
    .contains(entrada)
    .parent()
    .find('img[onclick*=remove]')
    .click()
    // estrategia 2 sem xpath
    cy.get('td.description')
    .contains(saida)
    .siblings()
    .children('img[onclick*=remove]')
    .click()
    
    cy.get('#data-table tbody tr').should('have.length',2)
});

it('Validar saldo com diversas transações', () => {
    
    let incomes =0;
    let expenses =0;

    cy.get('#data-table tbody tr')
// verifica os elementos
    .each(($el,index,$list)=>{
        // pega o elemento e procura  pelas classes income e expanse
        cy.get($el).find('td.income,td.expense')
        .invoke('text').then(text =>{

            // cy.log(text)
            if(text.includes('-')){
                expenses = expenses + format(text)
            }else{
                incomes = incomes +format(text)
            }
        })
    })

    cy.get('#totalDisplay').invoke('text').then(text =>{
        // cy.log('valor total',format(text))
        let formattedTotalDisplay = format(text)
        let expectedTotal = incomes+expenses

        expect(formattedTotalDisplay).to.eq(expectedTotal)
    })

});

});