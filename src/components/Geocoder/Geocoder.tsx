import React, {useEffect, useState} from 'react';
import './Geocoder.scss'

type DebounceOptions = {
    delay: number;
};

function useDebounce<T>(value: T, options: DebounceOptions): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, options.delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, options.delay]);

    return debouncedValue;
}


export const Geocoder = () => {
    const [value, setValue] = useState('')
    const [valuesData, setValuesData] = useState([])
    const queryValue = useDebounce(value, {delay: 1000})

    const apiKey = '6771fbb7988b774b6ef0880c39f105dac146cc1a';
    const secretKey = '7bd6708eb6086f34e71f9dac4707e0e4d2552f7c';
    console.log('queryValue', queryValue)

    useEffect(() => {
        const fetchSuggestions = async () => {
            const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
            const options: RequestInit = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${apiKey}`,
                    'X-Secret': secretKey
                },
                body: JSON.stringify({
                    query: queryValue,
                    locations: [
                        {
                            kladr_id: '7700000000000'
                        }
                    ],
                    restrictions: {
                        from_bound: {
                            value: 'street'
                        },
                        to_bound: {
                            value: 'house'
                        }
                    }
                })
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchSuggestions();
    }, [queryValue]);

    return (
        <div className='geocoder-wrap'>
            <div className="wrapper-field">
                <label htmlFor="field">Логин</label>
                <div className="wrapper-input">
                    <input type="text" placeholder="Email" className="field" name="field" id="field" value={value}
                           onChange={(e) => setValue(e.target.value)}/>
                </div>
            </div>
            <input/>
        </div>
    );
};