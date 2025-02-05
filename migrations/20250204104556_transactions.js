/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary();
    table
      .text("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("amt");
    table.enum("status", ["success", "failed", "pending"]);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};
