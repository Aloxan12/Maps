import React, {useEffect, useState} from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './Map.scss'

export const MapBlock = () => {
    const [currentCoordinates, setCurrentCoordinates] = useState([55.751574, 37.573856]);
    const coordinatesList = [
        [55.751574, 37.573856], // Координаты первого маркера
        [55.75222, 37.615555], // Координаты второго маркера
        // Добавьте остальные координаты в список
    ];

    return (
        <YMaps>
            <Map
                defaultState={{ center: currentCoordinates, zoom: 15 }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                width="100%"
                height="400px"
            >
                {coordinatesList.map((coordinates, index) => (
                    <Placemark
                        key={index}
                        geometry={coordinates}
                        properties={{
                            balloonContent: `<div class="custom-balloon">
                            <div class="header">Проспект Победы, 245</div>
                            <div>График работы</div>
                            <div>Выбран</div>
                            </div>`,
                        }}
                        options={{
                            balloonPanelMaxMapArea: 0,
                            balloonOffset:[10, 200]
                        }}
                        modules={['geoObject.addon.balloon']}
                    />
                ))}
            </Map>
        </YMaps>
    );
};