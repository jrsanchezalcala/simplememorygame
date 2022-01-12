// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import PictureServerService from '../../api/services/PictureServerService'


const  service : PictureServerService = new PictureServerService(); 

interface Props {
  nPictures : number
}

export default async function PicturesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let params : Props;
  try{
   params = JSON.parse(req.body)
    
  }
  catch(error){
    res.status(400).send("Bad params");
  }

  let pictures = await service.getAllPictures();
  params.nPictures = params.nPictures || 72;
  pictures = pictures.slice(0,params.nPictures);
  
  res.status(200).json(pictures);

}


