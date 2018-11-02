import React, { Component } from 'react';
import styles from './Sider.less';

class Sider extends Component {
  render() {
    const { data, lists } = this.props;
    const buildingNum = lists.filter(item => item.get('status') === 'building').size;
		return (
      <div className={styles.sider}>
        <h6>Summary</h6>
        <ul style={{width: '50%'}}>
          <li>building<span>{buildingNum}</span></li>
          <li>idle<span>{lists.size - buildingNum}</span></li>
        </ul>
        <h6>History</h6>
        <ul>
          {
            data.map(item => (
              <li key={item.id}>{item.label}</li>
            ))
          }
        </ul>
      </div>
		)
  }
}

export default Sider;
