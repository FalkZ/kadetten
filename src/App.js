import React, { Component } from 'react'

import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ContentSend from 'material-ui/svg-icons/content/send'
import Subheader from 'material-ui/Subheader'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'

import Markdown from 'react-remarkable'
import $ from 'jquery'
import scrollify from 'jquery-scrollify'

import IonIcon from './IonIcon'

import './App.styl'
import './Markdown.styl'

const programm = `## Unser Programm hat Konzept

Das **Grundgerüst** unseres Programmes bilden die Samstagprogramme. Diese finden in zweiwöchtenlich am Samstagnachmittag an verschiedenen Orten in der Stadt Zürich statt. Der Zweiwochenrhythmus erlaubt eine unkomplizierte Planung des Familienprogramms. Zur Erreichung der Gruppenzugehörigkeit ist eine regelmässige Teilnahme an den Übungen von grosser Bedeutung. Während der Schulferien finden keine Samstagsprogramme statt.


 [![](http://zuerich.kadetten.ch/wp-content/uploads/2011/03/programmkonzept.gif "programmkonzept")](http://zuerich.kadetten.ch/wp-content/uploads/2011/03/programmkonzept.gif)

Das Grundkonzept unseres Programms.

## Quartalsprogramm

Wir veröffentlichen viermal jährlich das **Quartalsprogramm**, welches Informationen über die Daten und Orte der Samstagsprogramme sowie über Lager und Spezialanlässe enthält.

Höhepunkte des Kadettenprogrammes stellen die regelmässig durchgeführten **Lager und Spezialanlässe** dar. Sie erlauben die Anwendung und Vertiefung des an den Samstagsprogrammen gelernten sowie die Festigung der Gruppenzugehörigkeit. Für die Teilnahme an Lagern und Spezialanlässe werden separate Einladungen versandt.

Während der wärmeren Perioden bieten die Kadetten Zürich Zeltlager unterschiedlicher Dauer an (über Pfingsten oder in den Sommerferien). Hauslager und Weekends werden z.B. in den Frühlings-, Herbst- oder Weihnachtsferien sowie über das Chlauswochenende durchgeführt.

Gerade die kürzeren Lager (Pfingstlager, Chlausweekend) erlauben es auch Jungkadetten, erste Schritte weg von zu Hause zu unternehmen.

Verschiedene **Spezialanlässe** runden das Jahresprogramm ab. Dazu zählen z.B. das Nachtspektakel (Abendübung), das Sportweekend, der Oberländer Nachtmarsch, das Grümpelturnier, die Schweizerischen Kadettentage sowie das Ski- und Snöberweekend.

Einzelne dieser Anlässe finden zusammen mit Kadetten aus anderen Orten statt.

`

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fetchedcontent: '',
			menustate: false,
			menuicon: 'menu',
			menu: [
				{ name: 'Aktuell', icon: 'whatshot' },
				{ name: 'Programm', icon: 'insert_invitation' },
				{
					name: 'Mitmachen',
					icon: 'person_add',
					submenu: ['Schnupperbesuch', 'Kosten + Leistungen', 'Anmelden + Mitmachen']
				},
				{ name: 'Gallerie', icon: 'photo_library' },
				{ name: 'Über uns', icon: 'help', submenu: ['Kontakt', 'Leiter + Trägerschaft', 'Ausbildung'] },
				{ devider: true },
				{ name: 'Leiter', icon: 'supervisor_account', submenu: ['Kaderbox'] }
			]
		}
	}

	componentWillMount = () => this.fetchContent()
	componentDidMount = () => {
		$.scrollify({
			section: '.Section',
			sectionName: 'section-name',
			interstitialSection: '',
			easing: 'easeOutExpo',
			scrollSpeed: 1100,
			offset: 0,
			scrollbars: true,
			standardScrollElements: '.Menu',
			setHeights: true,
			overflowScroll: true,
			updateHash: true,
			touchScroll: true,
			before: function() {
				$.scrollify.update()
			},
			after: function() {},
			afterResize: function() {},
			afterRender: function() {}
		})
	}
	fetchContent = () => {
		fetch('https://raw.githubusercontent.com/acdlite/react-remarkable/master/README.md')
			.then(response => {
				return response.text()
			})
			.then(fetchedcontent => this.setState({ fetchedcontent }))
	}

	toggleMenu = () => {
		let menuicon
		let menustate = !this.state.menustate
		if (menustate) {
			menuicon = 'close'
		} else {
			menuicon = 'menu'
		}
		this.setState({ menustate, menuicon })
	}
	getMenu = () =>
		this.state.menu.map(({ name, icon, submenu, devider }) => {
			if (devider) {
				return <Divider />
			} else if (typeof submenu === 'undefined') {
				return (
					<ListItem
						className="item"
						primaryText={name}
						leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
					/>
				)
			} else {
				return (
					<ListItem
						className="item"
						primaryText={name}
						leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
						primaryTogglesNestedList={true}
						nestedItems={submenu.map(menutext => <ListItem className="subitem" primaryText={menutext} />)}
					/>
				)
			}
		})

	render() {
		return (
			<div className={`App ${this.state.menuicon}`}>
				{programm.split('## ').map((section, index) => {
					if (index == 0) {
						return false
					} else {
						return (
							<div className="Section" data-section-name={section.split('\n')[0]}>
								<Paper className="Markdown" zDepth={5}>
									<Markdown source={'## ' + section} />
								</Paper>
							</div>
						)
					}
				})}
				<AppBar
					className="AppBar"
					title="Kadetten Zürich"
					iconElementRight={
						<span className="logo">
							<IonIcon icon="leaf" />
							<IonIcon icon="compass" />
							<IonIcon icon="bonfire" />
							<IonIcon icon="map" />
						</span>
					}
					iconElementLeft={
						<IconButton onClick={this.toggleMenu} iconClassName="material-icons">
							{this.state.menuicon}
						</IconButton>
					}
				/>
				<Paper zDepth={2} className={`Menu ${this.state.menuicon}`}>
					<List>{this.getMenu()}</List>
				</Paper>
				<Paper zDepth={1} className="Title">
					<h1>Programm</h1>
				</Paper>

				<div className="bg" />
			</div>
		)
	}
}
