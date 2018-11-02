import React, { Component } from 'react';
import styles from './Footer.less';

class Footer extends Component {
  render() {
		return (
			<footer className={styles.footer}>
        {this.props.children}
			</footer>
		)
  }
}

export default Footer;
