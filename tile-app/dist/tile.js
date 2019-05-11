const _jsxFileName = "/Users/logan/Dev/apps/weather/tile/tile.js";import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

class IconWithData extends Component {
  render() {
    const { props } = this;

    return (
      React.createElement('div', { className: "mt2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
        , React.createElement('img', { 
          src: '/~weather/img/' + props.icon + '.png', 
          width: 20, 
          height: 20,
          className: "dib mr2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}} )
        , React.createElement('p', { className: "label-small dib white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}, props.text)
      )
    ); 
  }
}

export default class WeatherTile extends Component {

  constructor(props) {
    super(props);

    let ship = window.ship;
    let api = window.api;

    this.state = {
      location: '',
      latlng: ''
    };
  }

  locationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  firstSubmit() {
    if (!this.state.location) {
      return;
    }

    this.askForLatLong(this.state.location)
  }

  locationSubmit() {
    if (!this.state.location) {
      return;
    }

    api.action('weather', 'json', this.state.latlng);
  }

  askForLatLong(place) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    let key = '&key=AIzaSyDawAoOCGSB6nzge6J9yPnnZH2VUFuG24E';
    fetch(url + encodeURI(place) + key)
      .then((obj) => {
        return obj.json();
      }).then((json) => {
        console.log(json);
        if (json && json.results && json.results.length > 0) {
          this.setState({
            latlng: 
              json.results[0].geometry.location.lat
              + ',' 
              + json.results[0].geometry.location.lng
          });
        }
      });
  }

  renderWrapper(child) {
    return (
      React.createElement('div', { className: "pa2 bg-dark-gray" , style: { width: 234, height: 234 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
        , child
      )
    );
  }

  renderNoData() {
    return this.renderWrapper((
      React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
        , React.createElement('p', { className: "white sans-serif" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}, "Weather")
        , React.createElement('input', { type: "text", onChange: this.locationChange.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}} )
        , this.state.latlng
        , React.createElement('button', { onClick: this.firstSubmit.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, "Submit")
        , React.createElement('button', { onClick: this.locationSubmit.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "Go")
      )
    ));
  }

  renderWithData(data) {
    let c = data.currently;
    let d = data.daily.data[0];

    let da = moment.unix(d.sunsetTime).format('h:mm a') || '';

    return this.renderWrapper((
      React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
        , React.createElement('p', { className: "white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, "Weather")
        , React.createElement('div', { className: "w-100 mb2 mt2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
          , React.createElement('img', { 
            src: '/~weather/img/' + c.icon + '.png', 
            width: 64, 
            height: 64,
            className: "dib", __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}} )
          , React.createElement('h2', { 
            className: "dib ml2 white"  ,
            style: {
              fontSize: 72,
              lineHeight: '64px',
              fontWeight: 400
            }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}
            , Math.round(c.temperature), "°")
        )
        , React.createElement('div', { className: "w-100 cf" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
          , React.createElement('div', { className: "fl w-50" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
            , React.createElement(IconWithData, { 
              icon: "winddirection",
              text: c.windBearing + '°', __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} )
            , React.createElement(IconWithData, { 
              icon: "chancerain",
              text: c.precipProbability + '%', __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}} )
            , React.createElement(IconWithData, { 
              icon: "windspeed",
              text: Math.round(c.windSpeed) + ' mph', __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}} )
          )
          , React.createElement('div', { className: "fr w-50" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
            , React.createElement(IconWithData, { 
              icon: "sunset",
              text: da, __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}} )
            , React.createElement(IconWithData, { 
              icon: "low",
              text: Math.round(d.temperatureLow) + '°', __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} )
            , React.createElement(IconWithData, { 
              icon: "high",
              text: Math.round(d.temperatureHigh) + '°', __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}} )
          )
        )
      )
    ));
  }

  render() {
    let data = !!this.props.data ? this.props.data : {};

    if ('currently' in data && 'daily' in data) {
      return this.renderWithData(data);
    }

    return this.renderNoData();
  }

}

window.weatherTile = WeatherTile;
