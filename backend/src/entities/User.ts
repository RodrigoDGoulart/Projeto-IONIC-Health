import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({name:"users"})
export class User {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, unique:true, length: 100})
    nomeSolicitacao: string;

    @Column({nullable: false, unique:false, length: 70})
    tipoSolicitacao: string;

    @Column({nullable: true, unique:false, length: 70})
    solicitante: string;

    @Column({nullable: true, unique:false, default:null})
    verificaSolicitacao: boolean;
    
}
