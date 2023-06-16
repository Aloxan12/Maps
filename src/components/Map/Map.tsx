import React, {useEffect, useState} from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './Map.scss'

export const MapBlock = () => {
    const [currentCoordinates, setCurrentCoordinates] = useState([55.751574, 37.573856]);
    const coordinatesList = [
        [55.751574, 37.573856], // Координаты первого маркера
        [55.75222, 37.615555], // Координаты второго маркера
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
                            <div class="body">
                                <small>
                                    График работы
                                </small>
                                <span><b>Пн — Сб:</b> с 8:00 до 21:30</span>
                                <span><b>Вс:</b> с 9:00 до 20:00</span>
                            </div>
                            <div class="btn">Выбрать</div>
                            </div>`,
                        }}
                        options={{
                            balloonPanelMaxMapArea: 0,
                        }}
                        modules={['geoObject.addon.balloon']}
                    />
                ))}
            </Map>
        </YMaps>
    );
};