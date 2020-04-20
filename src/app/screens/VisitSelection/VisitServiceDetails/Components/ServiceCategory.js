import React from "react";
import Slider from "react-slick";
import {ServiceCategorySettings} from "../../../../constants/config"
import { getServiceCategoryImage } from '../../../../utils/validations'

export function ServiceCategory(props){
    
    let serviceCategoryTemplate = props.categoryList.map((service, index) => {
        let catNum = index + 1;
        let image_url = getServiceCategoryImage(service.serviceCategoryId);
        let ServiceListClassName = 'ServiceCatList new-SC-ui'
        return (
            <div className={ServiceListClassName} key={`ServiceCat_${catNum}`}>
                <input 
                id={'ServiceCat' + catNum} 
                type='checkbox'  
                name='ServiceCat'
                checked={service.serviceCategoryId === props.checkedServiceCategoryId}
                value={catNum}
                onClick={(e) => {
                    props.handleServiceCategory(service)
                }}
                />
                <label className='ServiceCatLink CardBoxes theme-primary' htmlFor={'ServiceCat' + catNum}>
                    <img key={index}
                        src={require(`../../../../assets/CategoryImages/${image_url}`)}
                        className="SliderBtnImg" alt=''/>
                    <span>{service.serviceCategoryDescription}</span>
                </label>
                
            </div>

            
        )
    });
    return(
        <div className='ServiceCategory WhiteBG'>
            <Slider {...ServiceCategorySettings}>
                {serviceCategoryTemplate}
            </Slider>
            
        </div>
    )
    
}

export default ServiceCategory;