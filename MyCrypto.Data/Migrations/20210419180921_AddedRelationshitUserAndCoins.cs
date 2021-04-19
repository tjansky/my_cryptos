using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCrypto.Data.Migrations
{
    public partial class AddedRelationshitUserAndCoins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "AddedCoins",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AddedCoins_AppUserId",
                table: "AddedCoins",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AddedCoins_AppUsers_AppUserId",
                table: "AddedCoins",
                column: "AppUserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddedCoins_AppUsers_AppUserId",
                table: "AddedCoins");

            migrationBuilder.DropIndex(
                name: "IX_AddedCoins_AppUserId",
                table: "AddedCoins");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "AddedCoins");
        }
    }
}
