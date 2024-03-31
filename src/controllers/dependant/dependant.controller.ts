import { Request, Response } from 'express'
import Dependant from '../../models/dependant.entity'

export default class DependantController {
    static async store(req: Request, res: Response){
        const {name, kinship} = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        if(!name){
            return res.status(400).json({erro: 'Nome é obrigatório!'})
        }

        const dependant = new Dependant()
        dependant.name = name
        dependant.kinship = kinship ?? false
        dependant.userId = Number(userId)
        await dependant.save()

        return res.status(201).json(dependant)
    }

    static async index(req: Request, res: Response){
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const dependants = await Dependant.find({where: { userId: Number(userId) }})
        return res.status(200).json(dependants)
    }

    static async show(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const dependant = await Dependant.findOneBy({id: Number(id), userId: Number(userId)})

        if(!dependant) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        return res.json(dependant)

    }

    static async delete(req: Request, res: Response){
        const { id } = req.params // const id = req.params.id
        const { userId } = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const dependant = await Dependant.findOneBy({id: Number(id), userId: Number(userId)})

        if(!dependant) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        await dependant.remove()
        return res.status(204).send()
    }

    static async update(req: Request, res: Response){

        const { id } = req.params
        const { name, kinship } = req.body
        const { userId } = req.headers

        if(!name){
            return res.status(400).json({ error: 'O nome é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if(kinship === undefined){
            return res.status(400).json({ error: 'O parentesco é obrigatório' })
        }
        //
        if(!id || isNaN(Number(id))){
            return res.status(400).json({ erro: 'O id é obrigatório'})
        }

        const dependant = await Dependant.findOneBy({id: Number(id),  userId: Number(userId)})

        if(!dependant) {
            return res.status(404).json({erro: 'Não encontrado'})
        }

        //dependant.name = name || dependant.name // caso name for nulo na requisição (PUT), mantem o titulo original
        dependant.name = name
        dependant.kinship = kinship
        await dependant.save()

        return res.json(dependant)
    }
}