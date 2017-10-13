import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton'

export default class IonIcon extends Component {
	render() {
		return (
			<IconButton iconClassName="material-icons">
				<i className={`icon ion-${this.props.icon}`} />
			</IconButton>
		)
	}
}
