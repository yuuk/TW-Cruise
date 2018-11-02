import React, { Component } from 'react';
import { connect } from 'react-redux'
import Immutable from 'immutable';
import uuid from 'uuid/v4';
import { addResource, delResource } from 'store/actions';
import TopBar from 'components/TopBar';
import Footer from 'components/Footer';
import Menus from 'components/Menus';
import MenusData from 'common/menus.data';
import List from 'components/List';
import Sider from 'components/Sider';
import HistoryData from 'common/history.data';
import './container.less'

@connect(state => state)
class Container extends Component {
  /**
   * 添加 resource
   */
  handleAdd = (listId, value) => {
    const { dispatch } = this.props;
    const resources = value.split(',').map(item => ({
      id: uuid(),
      label: item,
    }));
    dispatch(addResource(listId, Immutable.fromJS(resources)));
  }

  /**
   * 删除 resource
   */
  handleDelete = (listId, resourceId) => {
    const { dispatch } = this.props;
    dispatch(delResource(listId, resourceId))
  }

  render() {
    const { lists } = this.props;
		return (
			<div className="dashboard">
        <TopBar />
        <div className="container">
          <h1 className="logo">Cruise</h1>
          <div className="panel">
            <header className="panelHeader">
              <div className="filters">
                Agents
                <button>All</button>
                <button className="active">Physical</button>
                <button>Virtual</button>
              </div>
              <Menus data={MenusData}/>
            </header>
            <div className="panelBody">
              <div className="panelMain">
                <List
                  onDelete={this.handleDelete}
                  onAdd={this.handleAdd}
                  data={lists}
                />
              </div>
              <div className="panelSider">
                <Sider lists={lists} data={HistoryData} />
              </div>
            </div>
          </div>
        </div>
        <Footer>Copyright Thoughtworks Inc.</Footer>
			</div>
		)
  }
}

export default Container;
