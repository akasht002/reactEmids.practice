import React ,{Fragment} from "react";

export function EntityUserMyConversionDefault(){

    let initConversations = []
  
    for (let i = 0; i < 1; i++) {
      initConversations.push(<Fragment>
        {
          <li className="list-group-item NoInformation myConversationContainer">
          <div className="myConversationContent">
            <div className="avatarWidget">
              <div className="avatarContainer"/>
            </div>
            <div className="MsgThreadContent m-auto">
            <div className="no-blockinfo-top">
          <div className="NoProfileServices No-Coverastion-Block theme-primary-light">
          <span className="NoInfoText"><span className="NoServiceInfoLink theme-primary">No Coverastions</span></span>
          </div>
           </div>
            </div>
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