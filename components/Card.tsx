import IPicture from "../interfaces/IPicture";
import React, { FunctionComponent } from 'react'
import Image from 'next/image'

type Props = {
  picture : IPicture,
  width ?: number,
  height ?: number,
  isUp ?: boolean
}

const srcImageDown = "/images/down.jpg";

const Card :   FunctionComponent<Props> = ({ picture , width = null , height = null, isUp  = false}) => {
    return(
        <>
                    <div  style={{width:width , height:height ,borderRadius : 2 , padding : 0 ,border :"solid 1px black" }} >

        { isUp ?
            <Image src={picture.src} alt={picture.description} width={width} height={height} />
        :
            <div style={{backgroundColor : "yellow" , width: "100%" , height : "100%"}}></div>
        }
            </div>
        </>
    );
}

export default Card;