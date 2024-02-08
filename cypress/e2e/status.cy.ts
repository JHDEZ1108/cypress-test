describe('Probando status code', () =>{
  
  it('Debe validar el status code exitoso (200)', function(){
    cy.request('employees')
        .its('status')
        .should('eq', 200)
  })
  
  it('Debe validar el status code fallido (404)', function(){
    cy.request({url: 'employees/4', failOnStatusCode: false})
        .its('status')
        .should('eq', 404)
  })

  it('Debe validar el status code de redirección (301)', function(){
    cy.request({url: 'redirect', followRedirect: false})
        .its('status')
        .should('eq', 301)
  })

  it('Debe validar el status code de error del servidor (500)', function(){
    cy.request({url: 'servererror', failOnStatusCode: false})
        .its('status')
        .should('eq', 500)
  })
})
