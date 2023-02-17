import React, { PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import { Container, Col, Row } from 'reactstrap';

const mapStyle = {
    width: '100%',
    height: 600
}

const mapboxApiKey = 'MAPBOX_API_KEY'

const params = {
    country: "ca"
}

class MapView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 15
      }
    };

  }

  onSelected = (viewport, item) => {
      this.setState({
        viewport
      })
  }

  render() {
    const { viewport } = this.state;
    return(
      <Container fluid={true}>
        <Row>
          <Col><h2>Mapbox Tutorial</h2></Col>
        </Row>
        <Row className="py-4">
          <Col xs={2}>
            <Geocoder
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                queryParams={params}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactMapGL
              mapboxApiAccessToken={mapboxApiKey}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              {...viewport}
              {...mapStyle}
              onViewportChange={(viewport) => this.setState({viewport})}
            >
            </ReactMapGL>
          </Col>
        </Row>
      </Container>
   );
  }
}

export default MapView;