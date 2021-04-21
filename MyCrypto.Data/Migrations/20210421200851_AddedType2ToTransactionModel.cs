using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCrypto.Data.Migrations
{
    public partial class AddedType2ToTransactionModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_AddedCoins_AddedCoinId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IdAddedCoin",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "AddedCoinId",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_AddedCoins_AddedCoinId",
                table: "Transactions",
                column: "AddedCoinId",
                principalTable: "AddedCoins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_AddedCoins_AddedCoinId",
                table: "Transactions");

            migrationBuilder.AlterColumn<int>(
                name: "AddedCoinId",
                table: "Transactions",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "IdAddedCoin",
                table: "Transactions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_AddedCoins_AddedCoinId",
                table: "Transactions",
                column: "AddedCoinId",
                principalTable: "AddedCoins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
