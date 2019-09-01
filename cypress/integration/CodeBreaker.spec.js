describe('Code breaker tests', function() {
    it('Set up secret number', function() {
        cy.visit('http://localhost:3000/')
        cy.contains('Code Breaker')
        cy.get('#startButton').click()
        cy.contains('ok, let the game begins')
        
    })

    it('Guess secret number', function() {
        cy.get('#textNumber')
        .type('1234')
        .should('have.value','1234')

        cy.get('#buttonGuess')
            .click()
        cy.contains('XXXX')
    })
})