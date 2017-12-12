import React, { Component } from "react";

import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ContentSend from "material-ui/svg-icons/content/send";
import Subheader from "material-ui/Subheader";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import Paper from "material-ui/Paper";

import Markdown from "react-remarkable";
import Scrollspy from "react-scrollspy";
import $ from "jquery";
//import scrollify from 'jquery-scrollify'

import IonIcon from "./IonIcon";

import Background from "./circle-mess.svg";

import "./App.styl";
import "./Markdown.styl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      index: 0,
      pages: [{ topic: " ", icon: " ", titles: [" "], sections: [" "] }],
      fetchedcontent: "",
      menustate: false,
      menuicon: "menu",
      menu: [
        { name: "Aktuell", icon: "whatshot" },
        { name: "Programm", icon: "insert_invitation" },
        {
          name: "Mitmachen",
          icon: "person_add",
          submenu: [
            "Schnupperbesuch",
            "Kosten + Leistungen",
            "Anmelden + Mitmachen"
          ]
        },
        { name: "Gallerie", icon: "photo_library" },
        {
          name: "Über uns",
          icon: "help",
          submenu: ["Kontakt", "Leiter + Trägerschaft", "Ausbildung"]
        },
        { devider: true },
        { name: "Leiter", icon: "supervisor_account", submenu: ["Kaderbox"] }
      ]
    };
  }

  componentWillMount = () => this.fetchContent();
  componentDidMount = () => {
    /*$.scrollify({
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
			before: function() {},
			after: function() {},
			afterResize: function() {},
			afterRender: function() {}
		})
    */
  };
  fetchContent = () => {
    console.log("fetch");
    var pages = [];
    fetch("https://api.github.com/repos/falkz/kadetten/contents/pages")
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        response.map((tofetch, index) => {
          fetch(tofetch.download_url)
            .then(response => {
              return response.text();
            })
            .then(fetchedcontent => {
              let topic = "";
              let icon = "";
              let titles = [];
              let sections = [];

              fetchedcontent.split("\n## ").map((section, index) => {
                if (index == 0) {
                  let temp = section.split("icon: ");
                  topic = temp[0].replace("# ", "").trim();
                  icon = temp[1].trim();
                } else {
                  titles[index - 1] = section.split("\n")[0];
                  sections[index - 1] = "## " + section;
                }
              });

              pages[index] = { topic, icon, titles, sections };
            })
            .then(() => this.setState({ pages }));
        });
      });
  };

  setIndex = index => {
    console.log(index);
    this.setState({ index });

    window.location.hash = window.location.hash;
    //this.setState({ index })
  };

  toggleMenu = () => {
    let menuicon;
    let menustate = !this.state.menustate;
    if (menustate) {
      menuicon = "close";
    } else {
      menuicon = "menu";
    }
    this.setState({ menustate, menuicon });
  };
  getCurrent = () => {
    console.log($(".current").attr("href"));
    this.setState({ current: $(".current").attr("href") });
  };

  getMenu = () =>
    this.state.pages.map(({ topic, icon, titles, devider }, index) => {
      if (devider) {
        return <Divider key={index} />;
      } else {
        return (
          <ListItem
            key={index}
            className="item"
            primaryText={topic}
            leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
            primaryTogglesNestedList={true}
            onClick={() => this.setIndex(index)}
            id={index}
            nestedItems={titles.map((title, key) => (
              <ListItem
                key={key}
                className="subitem"
                primaryText={title}
                href={"#" + title}
                onClick={() => this.setIndex(index)}
                id={`${index}-${title}`}
              />
            ))}
          />
        );
      }
    });

  render() {
    return (
      <div className={`App ${this.state.menuicon}`}>
        {this.state.pages[this.state.index].sections.map((section, index) => (
          <section
            key={index}
            className="Section"
            id={this.state.pages[this.state.index].titles[index]}
          >
            <Paper className="Markdown" zDepth={5}>
              <Markdown source={section} />
            </Paper>
          </section>
        ))}
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
            <IconButton
              onClick={this.toggleMenu}
              iconClassName="material-icons"
            >
              {this.state.menuicon}
            </IconButton>
          }
        />
        <Paper zDepth={2} className={`Menu ${this.state.menuicon}`}>
          <List>{this.getMenu()}</List>
        </Paper>
        <Paper zDepth={1} className="Title">
          <h1>{this.state.pages[this.state.index].topic}</h1>
        </Paper>
        <div
          className="bg"
          style={{
            backgroundColor: "#3f8c0b",
            backgroundImage: `url(${Background})`
          }}
        />

        <div className="arrow">
          <IconButton
            className="arrow"
            onClick={this.toggleMenu}
            iconClassName="material-icons"
          >
            keyboard_arrow_down
          </IconButton>
        </div>
        <Scrollspy
          items={this.state.pages[0].titles}
          currentClassName="current"
        >
          {this.state.pages[0].titles.map((title, index) => (
            <a href={"#" + title} key={index} />
          ))}
        </Scrollspy>
      </div>
    );
  }
}
