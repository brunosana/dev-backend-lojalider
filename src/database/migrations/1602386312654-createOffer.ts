import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class createOffer1602386312654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'offer',
                type: 'decimal',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'offer');
    }
}
