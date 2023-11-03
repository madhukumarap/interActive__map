import React from 'react';
import {gsap} from 'gsap'; //greenSock animation platform library to create animation in web application
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import mapdata from '../../utils/mapdata';
import { Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
const Map = () => {
    const comp = React.useRef();
    // useLayoutEffect function thw we can kill animations Proper animation cleanup is crucial to avoid unexpected behaviour with 
    //The useLayoutEffect hook is similar to the useEffect theme in that it fires synchronously once all DOM loading is completed, rather than asynchronous like the useEffect hook
    React.useLayoutEffect(() =>{
        let ctx = gsap.context(() => {
            gsap.from('.theState', {
                duration: 0.6,
                stagger: 0.3,
                ease: 'back',
                y: 96,
                opacity: 0,
            });
            gsap.from('.theMarkers',{
                duration: 0.6,
                stagger: 0.3,
                opacity: 0,
            });
            let tl = gsap.timeline();
            tl.to('.theCountry', {
                delay: 5.4,
                fill: '#FF331F',
                duration: 0.8,
            });
            tl.to('.theCountry', {
                fill: 'white',
            });
            tl.to('.theCountry',{
                delay: 0.4,
                fill: '#FF331F',
                duration: 0.8,
            });
            tl.to('.theCountry', {
                fill: 'white',
            });
        },comp);
        return () => ctx.revert();
    });
    return (
        <ComposableMap
        projection='geoMercator'
        projectionConfig={{
            scale:3500,
            center:[19, 52]
        }}
        fill='white'
        stroke='black'
        strokeWidth={3}
    >
      <Geographies geography={mapdata.data} ref={comp}>
        {(geographies) =>{
            return(
                <>
                {geographies.geographies.map((geo) => {
                    const stateName = geo.properties.VARNAME_1;

                    return (
                        <Geography
                        onClick={() => console.log(stateName)}
                        key={geo.rsmKey}
                        className='theState theCountry'
                        geography={geo}
                        style={{
                            hover: {
                                fill: '#FF331F'
                            },
                        }}
                        />
                    )
                })}
                {geographies.geographies.map((geo) => {
                    const provinceCenter = geoCentroid(geo);
                    let colorFill = 'black';
                    let customPlacement = [12.388374473623244, 76.98126582804632]
                    return (
                        <Marker  className='theMarkers'
                        key={geo.rsmKey} 
                        coordinates={
                            geo.properties.VARNAME_1 === 'Aladahalli ' ? 
                            customPlacement 
                            : provinceCenter
                        }
                        // className='theMarkers'
                        >
                            <text style={{
                                fill :
                                geo.properties.VARNAME_1 === 'Aladahalli '
                                ? 'blue'
                                : colorFill,
                                strokeWidth: 0,
                            }}
                            textAnchor='middle'
                            >{geo.properties.VARNAME_1}</text>
                        </Marker>
                    )
                })}
                </>
            );
        }}
      </Geographies>
    </ComposableMap>
    
  );
};

export default Map;

//<COmposableMap> is a wrapper components that determine the map context ti is in this component that will set typr of projection in which we will dispaly the map and config such as scaling rotating and centering
//<Geographies> is the component where you will reference the fill or like totpjson /geojson files of the country of youe choice
//The <Geography> component is the one in charge of rendering SVG, by wrapping the SVG path element.