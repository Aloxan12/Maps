import React from 'react';
import './Map.scss'
import {MapBlock} from "./Map";

export const MapPopup = () => {
    return (
        <div className='map-popup-wrap'>
            <div className='city-list'>
                <div className="city-item active">
                    <div className="title">Проспект Победы, 245</div>
                    <div className="body">
                        <span><b>Пн — Сб:</b> с 8:00 до 21:30</span>
                        <span><b>Вс:</b> с 9:00 до 20:00</span>
                    </div>
                    <div className="footer">
                        <div className="btn">
                            Выбрать
                        </div>
                        <div className="status">
                            Все товары в наличии
                        </div>
                    </div>
                </div>
                <div className="city-item">
                    <div className="title">Шоссе Объездная-Ялта, 20</div>
                    <div className="body">
                        <span><b>Пн — Сб:</b> с 8:00 до 21:30</span>
                        <span><b>Вс:</b> с 9:00 до 20:00</span>
                    </div>
                    <div className="footer">
                        <div className="btn">
                            Выбрать
                        </div>
                        <div className="status wait">
                            Привезём 20.05
                        </div>
                    </div>
                </div>
            </div>
            <div className="map-wrap">
                <MapBlock />
            </div>
        </div>
    );
};