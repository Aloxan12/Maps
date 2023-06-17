import React, {useEffect, useState} from 'react';

export const Geocoder = () => {
    const [value, setValue] = useState('')

    const apiKey = '6771fbb7988b774b6ef0880c39f105dac146cc1a';
    const secretKey = '7bd6708eb6086f34e71f9dac4707e0e4d2552f7c';

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
                    query: value,
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
    }, [value]);

    return (
        <div>
            <input value={value} onChange={(e)=> setValue(e.target.value)} />
        </div>
    );
};