import React from "react"
import { connect } from "react-redux"
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

//import {Transactions} from "../../containers/Transactions"

//import {Dashboard} from "../../containers/Dashboard"

import {InfoKyber} from "../../containers/InfoKyber"

import {Exchange} from "../../containers/Exchange"

import {Transfer} from "../../containers/Transfer"

import TermOfService from "../../components/TermOfService"

//import {SideBar} from "../../containers/SideBar"
import {Header} from "../../containers/Header"

//import {RateInfo} from "../../containers/RateInfo"

import {ImportAccount} from "../ImportAccount"

//import {GlobalControl} from "../../containers/GlobalControl"

//import { loadAccounts } from "../../actions/accountActions"
import history from "../../history"


@connect((store) => {
  return {
    ethereumNode: store.connection.ethereum,
    currentBlock: store.global.currentBlock,
    connected: store.global.connected,
    termOfServiceAccepted: store.global.termOfServiceAccepted,
  }
})
export default class Layout extends React.Component {

  componentWillMount() {
    this.props.ethereumNode.watch()
  }

  render() {
    var app
    if (this.props.termOfServiceAccepted) {
      app = (
        <div class="k-body">          
          <Route component={Header}/>          
          <div class="k-contenter">
            <div id="content" class="k-content">
              <Route exact path="/" component={ImportAccount}/>                            
              <Route exact path="/info" component={InfoKyber}/>              
              <Route exact path="/exchange" component={Exchange}/>
              <Route exact path="/transfer" component={Transfer}/>
            </div>
          </div>          
        </div>
      )
    } else {
      app = (
        <TermOfService />
      )
    }
    return (
      <ConnectedRouter history={history}>
        <div>
          {app}
        </div>
      </ConnectedRouter>
    )
  }
}