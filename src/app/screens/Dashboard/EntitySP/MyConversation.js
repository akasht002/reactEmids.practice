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
              <div className="NoProfileServices">
                <i className="NoInformationIcon"/><span>No Conversations</span>
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