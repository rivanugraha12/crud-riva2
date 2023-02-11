/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('anggota', table => {
        table.string('kta', 8)
        table.string('nama', 64)
        table.enum('jenisKelamin', ['L', 'P'])
        table.string('alamat', 128)
        table.string('nohp', 13)
        table.primary('nis')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('santri')
};