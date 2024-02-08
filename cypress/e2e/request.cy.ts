describe("Probando requests", () => {
  let employeeId: number; // 'employeeId' es un número

  it("Debe de crear un empleado", function () {
    cy.request({
      url: "/employees",
      method: "POST",
      body: {
        first_name: "Prueba",
        last_name: "Desarrollador",
        email: "aa@cc.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      employeeId = response.body.id; // Almacenar el ID para usar en otros tests
    });
  });

  it("Debemos de validar que se haya creado en la base de datos", function () {
    cy.request(`/employees/${employeeId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.first_name).to.eq("Prueba");
    });
  });

  it("Debemos de modificar al empleado con un nuevo correo", function () {
    cy.request({
      url: `/employees/${employeeId}`,
      method: "PUT",
      body: {
        first_name: "Pepito",
        last_name: "Desarrollador",
        email: "nuevo@correo.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", employeeId);
      expect(response.body.email).to.eq("nuevo@correo.com"); // Verificar que el email se haya actualizado
    });
  });

  it("Debemos de eliminar el registro creado", function () {
    cy.request({
      url: `/employees/${employeeId}`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Después de eliminar el registro, podríamos querer asegurarnos de que realmente se haya eliminado
  it("Validar que el empleado fue eliminado", function () {
    cy.request({
      url: `/employees/${employeeId}`,
      failOnStatusCode: false // Esto previene que Cypress falle si el recurso ya no existe
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
