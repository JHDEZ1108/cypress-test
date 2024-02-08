describe("Pruebas a base de datos", () => {
  let insertId: number; // Guarda el id del registro insertado

  after(() => {
    cy.task("queryDb", "DELETE FROM pruebas");
  });

  it("Inserto en la base de datos", function () {
    cy.task(
      "queryDb",
      "INSERT INTO pruebas (nombre, apellidoMaterno, apellidoPaterno) VALUES ('Javier', 'Fuentes', 'Mora')"
    ).then((result: any) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.eq(1);
      insertId = result.insertId; // Guardar el insertId para usar en pruebas posteriores
    });
  });

  it("Select para comprobar que esté lo de la prueba pasada", function () {
    cy.task(
      "queryDb", 
      `SELECT * FROM pruebas WHERE id=${insertId}`
    ).then((result: any) => {
      cy.log(JSON.stringify(result));
      expect(result[0].nombre).to.eq("Javier");
      expect(result[0].apellidoMaterno).to.eq("Fuentes");
      expect(result[0].apellidoPaterno).to.eq("Mora");
    });
  });

  it("Delete para borrar lo que se hizo en los test pasados", function () {
    cy.task(
      "queryDb", 
      `DELETE FROM pruebas WHERE id=${insertId}`
    ).then((result: any) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.eq(1);
      expect(result.serverStatus).to.eq(2);
    });
  });
});
