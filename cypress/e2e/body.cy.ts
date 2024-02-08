describe('Probando el body', function(){

  it('Probado el body con status code', function(){
    cy.request('employees/1')
      .its('body')
      .its('first_name')
      .should('be.eq', 'Javier')
      
    cy.request('employees/1')
      .then( (response) => {
        expect(response.status).to.be.equal(200)
        expect(response.headers['content-type']).to.be.equal('application/json')
        expect(response.body.first_name).to.be.equal('Javier')
        expect(response.body.last_name).to.be.equal('Eschweiler')

      })
  })
  
})
