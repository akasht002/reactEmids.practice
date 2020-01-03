import React ,{Fragment} from "react";

export function EntityUserMyConversionDefault(){

    let initConversations = []
  
    for (let i = 0; i < 1; i++) {
      initConversations.push(<Fragment>
        {
          <li className="list-group-item NoInformation myConversationContainer">
          <div className="right-empty-srblock">
          <img src={require('../../../assets/images/service-request-feature.png')} alt="Service-Request" />
          </div>
         </li>
        }
      </Fragment>)
    }
    return (
      <Fragment>
        {initConversations}
      </Fragment>
    )
  }

  
export default  EntityUserMyConversionDefault;