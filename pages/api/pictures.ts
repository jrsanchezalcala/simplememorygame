// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import PictureServerService from '../../api/services/PictureServerService'


const  service : PictureServerService = new PictureServerService(); 

export default function PicturesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  res.status(200).json(async () => await service.getAllPictures());

}


