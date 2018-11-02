import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popup from 'components/Popup'
import styles from './List.less';

class List extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  render() {
    const { data, onAdd, onDelete } = this.props;
		return (
			<div className={styles.list}>
      {data.map(item => (
        <div key={item.get('id')} className={classnames(styles.item, { [styles.building]: item.get('status')==='building'})}>
          <p className={styles.avatar} />
          <div className={styles.summary}>
            <b className={styles.name}>{item.get('address')}</b>
            <i className={styles.config}>{item.get('status')}</i>
            <i className={styles.config}>{item.get('ip')}</i>
            <i className={styles.config}>{item.get('path')}</i>
            <div className={styles.resources}>
              <Popup onOk={value => {onAdd(item.get('id'), value)}}>
                <span className={styles.addAction}>
                  <a href="javascrip:;">Specify resources</a>
                </span>
              </Popup>
              <span className={styles.resourceList}>
                {
                  (item.get('status') === 'idle') && (
                    <span className={styles.deny}>
                      <svg className={styles.icon} viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372 0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372 0 89-31.3 170.8-83.5 234.8z" /></svg>
                      <a href="##">Deny</a>
                    </span>
                  )
                }
                Resources:
                {item.get('resources').map(resource =>(
                  <span
                    key={resource.get('id')}
                    className={styles.resourceItem}
                  >
                      {resource.get('label')}
                    <button onClick={() => { onDelete(item.get('id'), resource.get('id')) }}>&times;</button>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      ))}
			</div>
		)
  }
}

export default List;
