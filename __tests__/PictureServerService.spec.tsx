import { render } from '@testing-library/react'
import PictureServerService from '../api/services/PictureServerService'
import Home from '../pages/home'


describe('PictureServerService' , () => {
    
    
    
    it('GetAll pictures', async () => {
        let service  = new PictureServerService();
        let pictures = await service.getAllPictures();
        expect(pictures).toBeDefined();
        expect(pictures.length > 0).toBe(true);
        
    })
})
