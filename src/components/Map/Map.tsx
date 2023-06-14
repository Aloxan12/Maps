import React, {useState} from 'react';
import {Placemark,Map, withYMaps, YMaps} from "react-yandex-maps";
import './Map.scss'

export const MapBlock = () => {
    const [currentCoordinates, setCurrentCoordinates] = useState([55.751574, 37.573856]);
    const [isBalloonOpen, setIsBalloonOpen] = useState(false); // Состояние открытия попапа
    const coordinatesList = [
        [55.751574, 37.573856], // Координаты первого маркера
        [55.75222, 37.615555], // Координаты второго маркера
        // Добавьте остальные координаты в список
    ];

    const handlePlacemarkClick = () => {
        setIsBalloonOpen(true); // Открываем попап при клике на маркер
    };

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
                        options={{
                            balloonContentLayout: `<div class="custom-balloon">hello</div>`,
                        }}
                        modules={['geoObject.addon.balloon']}
                        onClick={handlePlacemarkClick} // Добавляем обработчик события click
                    />
                ))}
            </Map>
        </YMaps>
    );
};

const CustomBalloonLayout = () => {
    return (
        <div className="custom-balloon">
            <div className="custom-balloon-content">ыфавывфы</div>
        </div>
    );
};