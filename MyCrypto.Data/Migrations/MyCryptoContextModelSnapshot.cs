﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyCrypto.Data;

namespace MyCrypto.Data.Migrations
{
    [DbContext(typeof(MyCryptoContext))]
    partial class MyCryptoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("MyCrypto.Core.Models.AddedCoin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CoinNameId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("AddedCoins");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppUsers");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AddedCoinId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Cost")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Earned")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Fee")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Price")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AddedCoinId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.AddedCoin", b =>
                {
                    b.HasOne("MyCrypto.Core.Models.AppUser", "AppUser")
                        .WithMany("AddedCoins")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.Transaction", b =>
                {
                    b.HasOne("MyCrypto.Core.Models.AddedCoin", "AddedCoin")
                        .WithMany("Transactions")
                        .HasForeignKey("AddedCoinId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AddedCoin");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.AddedCoin", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("MyCrypto.Core.Models.AppUser", b =>
                {
                    b.Navigation("AddedCoins");
                });
#pragma warning restore 612, 618
        }
    }
}
