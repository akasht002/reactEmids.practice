import React from "react";
import Slider from "react-slick";
import {ServiceCategorySettings} from "../../../constants/config"
import { getServiceCategoryImage } from '../../../utils/validations'

function ServiceCategory(props){
    let serviceCategories = props.servicesTypeArray && props.servicesTypeArray.map((item,index)=> item.serviceCategoryId)
                            .filter( (data,index,self) => self.indexOf(data) === index )
    let serviceCategoryTemplate = props.categoryList.map((service, index) => {
        let catNum = index + 1;
        let image_url = getServiceCategoryImage(service.serviceCategoryId);
        let ServiceListClassName = props.categoryList && props.categoryList.length > 0 ? 
        (serviceCategories.includes(service.serviceCategoryId) &&  service.serviceCategoryId !== props.checkedServiceCategoryId ) ? 'ServiceCatList new-SC-ui  selected' : 'ServiceCatList new-SC-ui'
        : 'ServiceCatList new-SC-ui'
        return (
            <div className={ServiceListClassName} key={`ServiceCat_${catNum}`}>
                <input 
                id={'ServiceCat' + catNum} 
                type='checkbox'  
                name='ServiceCat'
                checked={service.serviceCategoryId === props.checkedServiceCategoryId}
                value={catNum}
                onClick={(e) => {
                    props.handleServiceCategory(service.serviceCategoryId)
                }}
                />
                <label className='ServiceCatLink CardBoxes theme-primary' htmlFor={'ServiceCat' + catNum}>
                    <img key={index}
                        src={require(`../../../assets/CategoryImages/${image_url}`)}
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