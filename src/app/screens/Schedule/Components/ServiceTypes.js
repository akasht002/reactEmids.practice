import React from "react";
import Slider from "react-slick";
import { getServiceTypeImage } from '../../../utils/validations'

function ServiceTypes(props) {
    let serviceTypesTemplate = props.typeList.map((serviceTypes, index) => {
        let catNum = index + 1;
        const j = Object.values(serviceTypes);
        let image_url = getServiceTypeImage(serviceTypes.serviceTypeId);
        return (
            <div className={'ServiceTypeList theme-primary ' + (serviceTypes.isChecked ? 'selected' : '')} key={catNum}>
                <input
                    id={'ServiceType' + catNum}
                    type='checkbox'
                    className='ServiceTypeInput'
                    name='serviceType'
                    value={j}
                    checked={serviceTypes.isChecked}
                    onChange={(e)=>{
                    props.handleServiceType(serviceTypes, e.target.checked)
                }}
                />
                <label className='ServiceTypeLink' htmlFor={'ServiceType' + catNum}>
                    <span className='ServiceTypeImg'>
                        <img alt='N' src={require(`../../../assets/ServiceTypes/${image_url}`)} />
                    </span>
                    <div className='serviceTypeDesc'>
                        <span className='serviceName'>{serviceTypes.serviceTypeName}</span>
                    </div>
                </label>
                <span className='ServiceIndicatorBottom' />
            </div>
        )
    });

    let ServiceTypeSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: props.typeList.length,
        slidesToScroll: props.typeList.length,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: props.typeList.length > 5 ? 5 : props.typeList.length,
                    slidesToScroll: props.typeList.length > 5 ? 5 : props.typeList.length,
                    infinite: false,
                    variableWidth: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: props.typeList.length > 4 ? 4 : props.typeList.length,
                    slidesToScroll: props.typeList.length > 4 ? 4 : props.typeList.length,
                    infinite: false,
                    variableWidth: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: props.typeList.length > 3 ? 3 : props.typeList.length,
                    slidesToScroll: props.typeList.length > 3 ? 3 : props.typeList.length,
                    infinite: false,
                    variableWidth: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: props.typeList.length > 2 ? 2 : props.typeList.length,
                    slidesToScroll: props.typeList.length > 2 ? 2 : props.typeList.length,
                    infinite: false,
                    variableWidth: true,
                    speed: 500,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: props.typeList.length > 5 ? 5 : props.typeList.length,
                    slidesToScroll: props.typeList.length > 5 ? 5 : props.typeList.length,
                    infinite: false,
                    variableWidth: true,
                    speed: 500,
                    dots: false
                }
            }
        ]
    }

    return (
        <div className='ServiceType WhiteBG' key={props.categoryId}>
            <Slider {...ServiceTypeSettings} className="ServiceTypesSlider">
                {serviceTypesTemplate}
            </Slider>
            {
                props.serviceTypeSelected && props.serviceTypeSelected.length === 0 && props.onClickSave &&
                <span className='text-danger d-block mb-2 MsgWithIcon MsgWrongIcon'>
                    Please select Service Type(s)
                </span>
            }
        </div>
    )

}

export default ServiceTypes;