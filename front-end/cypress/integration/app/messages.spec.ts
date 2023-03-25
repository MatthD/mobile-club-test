describe('should add a message', () => {
  it('should be able to add a message and show it', () => {
    const randomNumber = Math.round(Math.random() * 10);
    const message = `MobileClub!${randomNumber}`;

    cy.visit('http://localhost:3000');
    cy.dataCy('messageInput').type(message);
    cy.dataCy('submit').click();
    cy.dataCy('messageContainer').contains(message);
  });
  it('should be able to add a message with url and shortner it', () => {
    const randomNumber = Math.round(Math.random() * 10);
    const message = `MobileClub!${randomNumber} is at http://mobile.club`;
    cy.visit('http://localhost:3000');
    cy.dataCy('messageInput').type(message);
    cy.dataCy('submit').click();
    cy.dataCy('messageContainer').should(
      'not.include.text',
      'http://mobile.club',
    );
    cy.dataCy('messageContainer').contains('http://localhost:4000');
  });
});
