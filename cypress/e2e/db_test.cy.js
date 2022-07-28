describe("Example to Demonstrate SQL Database Testing in Cypress", () => {
  it("Create a Table employee", function () {
    cy.task(
      "queryDb",
      "CREATE TABLE users_new_updated (ID int, FirstName varchar(255), Address varchar(255), City varchar(255))"
    );
  });
  it("Input Entries into the table", function () {
    cy.task(
      "queryDb",
      `INSERT INTO users_new_updated (ID, FirstName, Address, City) VALUES
        (001, "John", "House No. 01", "Helsinki"),
        (002, "Pam", "House No. 02", "Espoo"),
        (003, "Dwight", "House No. 03", "Lapland"),
        (004, "Michael", "House No. 04", "Vantaa");`
    ).then((result) => {
      expect(result.affectedRows).to.equal(4);
    });
  });
  it("Update an Entry into the table and verify", function () {
    cy.task(
      "queryDb",
      `UPDATE users_new_updated SET FirstName = "Kevin" WHERE City="Vantaa"`
    ).then((result) => {
      expect(result.changedRows).to.equal(1);
    });
    cy.task(
      "queryDb",
      `SELECT FirstName FROM users_new_updated WHERE City="Vantaa"`
    ).then((result) => {
      expect(result[0].FirstName).to.equal("Kevin");
    });
  });

  it("Verify that there is only one row where the city is Espoo", function () {
    cy.task(
      "queryDb",
      `SELECT COUNT(*) as "rowCount" FROM users_new_updated WHERE City="Espoo"`
    ).then((result) => {
      expect(result[0].rowCount).to.equal(1);
    });
  });

  it("Delete a Table and Verify", function () {
    cy.task("queryDb", `DROP TABLE users_new_updated`).then((result) => {
      expect(result.message).to.equal("");
    });
  });
});
