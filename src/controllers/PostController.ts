import {Request, Response} from 'express';
import { prisma } from '../database';

export default async function createPost(request: Request, response: Response){
  try {
    const {title, content, userId} = request.body;


    const post = await prisma.post.create ({
      data: {
        title,
        content,
        userId
      }
    });

    return response.json ({
      error: false,
      message: 'Sucesso: Post criado com sucesso!',
      post
    });

  } catch (error) {
    return response.json({message: error.message});
  }
}

 export async function listPost(request: Request, response: Response){
  try {
    const {id} = request.params;


    const post = await prisma.post.findUnique({where: {id: Number(id)}});

    if(!post){
      return response.json ({
      error: true,
      message: 'Erro: Post não encontrado!'
    });
   }

     return response.json ({
      error: false,
      post
    });


  } catch (error) {
    return response.json({message: error.message});
  }
}

export async function updatePost(request: Request, response: Response){
  try {
    const { id } = request.params;
    const { title, content } = request.body;


    const postExists = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if(!postExists){
      return response.json ({
      error: true,
      message: 'Erro: Post não encontrado!'
    });
   }

   const post = await prisma.post.update({
    where: {
      id: Number(id)
    },
    data: {
      title,
      content
    }
   });

     return response.json ({
      error: false,
      message: 'Sucesso: Post atualizado!',
      post
    });


  } catch (error) {
    return response.json({message: error.message});
  }
}

export async function deletePost(request: Request, response: Response){
  try {
    const { id } = request.params;

    const postExists = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if(!postExists){
      return response.json ({
      error: true,
      message: 'Erro: Post não encontrado!'
    });
   }

   const post = await prisma.post.delete({
    where: {
      id: Number(request.params.id)
    }
   });

     return response.json ({
      error: false,
      message: 'Sucesso: Post deletado!',
      post
    });


  } catch (error) {
    return response.json({message: error.message});
  }
}