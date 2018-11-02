import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import styles from './Popup.less';

class Popup extends Component {

  static propTypes = {
    onOk: PropTypes.func,
  };

  static defaultProps = {
    onOk: () => {},
  }

  state = {
    value: '',
    popupVisible: false,
  }

  handleChange = value => {
    this.setState({ value });
  }

  handleKeydown = e => {
    if (e.keyCode === 13) {
      this.handleAdd()
    }
  }

  handleAdd = () => {
    const { value } = this.state;
    const { onOk } = this.props;
    this.handleClose();
    if (value) {
      onOk(value);
    }
  }

  handleClose = () => {
    this.handleVisible(false);
    this.setState({ value: '' });
  }

  handleVisible = (flag) => {
    this.setState({ popupVisible: flag });
  }

  render() {
    const { children } = this.props;
    const { value, popupVisible } = this.state;
		return (
			<Trigger
        action={['click']}
        popupVisible={popupVisible}
        popupClassName={styles.popupWrapper}
        onPopupVisibleChange={this.handleVisible}
        builtinPlacements={{
          topLeft: {
            points: ['tl', 'tl'],
          },
        }}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [-35, 25],
        }}
        popup={
          <div className={styles.popup}>
            <p className={styles.tips}>separate multiple resources name with commas</p>
            <input
              type="text"
              placeholder="You also can press enter to input resources"
              value={value}
              className={styles.input}
              onChange={e => {this.handleChange(e.target.value)}}
              onKeyDown={e => {this.handleKeydown(e)}}
            />
            <div className={styles.actions}>
              <button onClick={() => {this.handleAdd()}}>Add resources</button>
              <button onClick={() => {this.handleClose()}}>Close</button>
            </div>
          </div>
        }
      >
        {children}
      </Trigger>
		)
  }
}

export default Popup;
