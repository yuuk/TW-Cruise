import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Menus.less';

class Menus extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const { data } = this.props;
		return (
      <div className={styles.menus}>
        <ul>
          {data.map(menu => <li className={classnames({ [styles.active]:menu.active })} key={menu.id}><a href="#">{menu.label}</a></li>)}
        </ul>
      </div>
		)
  }
}

export default Menus;
