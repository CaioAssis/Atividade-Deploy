import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Token from "./token.entity"
// name! = not null
// @column({ nullable: true})
// @column({ name: 'nome_no_banco'})
@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Token, token => token.user)
    tokens! : Token[]
}
